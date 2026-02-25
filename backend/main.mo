import Map "mo:core/Map";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";



actor {
  include MixinStorage();

  type ProductCategory = {
    #nails;
    #jewellery;
  };

  type Product = {
    id : Nat;
    name : Text;
    category : ProductCategory;
    description : Text;
    price : Nat;
    imageUrl : Text;
    stockQuantity : Nat;
    tags : [Text];
  };

  module Product {
    public func compareByPrice(p1 : Product, p2 : Product) : Order.Order {
      Nat.compare(p1.price, p2.price);
    };
  };

  type ShippingAddress = {
    street : Text;
    city : Text;
    state : Text;
    postalCode : Text;
  };

  type OrderItem = {
    productId : Nat;
    quantity : Nat;
  };

  type Order = {
    id : Nat;
    customerName : Text;
    email : Text;
    shippingAddress : ShippingAddress;
    items : [OrderItem];
    totalPrice : Nat;
  };

  var nextProductId = 0;
  var nextOrderId = 0;

  let products = Map.empty<Nat, Product>();
  let orders = Map.empty<Nat, Order>();

  public shared ({ caller }) func addProduct(
    name : Text,
    category : ProductCategory,
    description : Text,
    price : Nat,
    imageUrl : Text,
    stockQuantity : Nat,
    tags : [Text],
  ) : async Nat {
    let product : Product = {
      id = nextProductId;
      name;
      category;
      description;
      price;
      imageUrl;
      stockQuantity;
      tags;
    };

    products.add(nextProductId, product);
    nextProductId += 1;
    product.id;
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : ProductCategory) : async [Product] {
    products.values().toArray().filter(
      func(p) {
        p.category == category;
      }
    );
  };

  public query ({ caller }) func getProduct(id : Nat) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?product) { product };
    };
  };

  public shared ({ caller }) func updateProductStock(productId : Nat, quantity : Nat) : async () {
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?product) {
        if (product.stockQuantity < quantity) {
          Runtime.trap("Insufficient stock");
        };
        let updatedProduct = {
          product with
          stockQuantity = product.stockQuantity - quantity;
        };
        products.add(productId, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func createOrder(
    customerName : Text,
    email : Text,
    shippingAddress : ShippingAddress,
    items : [OrderItem],
  ) : async Nat {
    let totalPrice = items.foldLeft(0, func(acc, item) { acc + item.quantity });

    for (item in items.values()) {
      await updateProductStock(item.productId, item.quantity);
    };

    let order : Order = {
      id = nextOrderId;
      customerName;
      email;
      shippingAddress;
      items;
      totalPrice;
    };

    orders.add(nextOrderId, order);
    nextOrderId += 1;
    order.id;
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    orders.values().toArray();
  };

  public shared ({ caller }) func seedProducts() : async () {
    let initialProducts = [
      (
        "Elegant French Tips",
        #nails,
        "Classic white-tipped artificial nails for a sophisticated look.",
        2500,
        "https://example.com/french-tips.jpg",
        100,
        ["classic", "elegant", "long-lasting"],
      ),
      (
        "Rose Gold Gel Nails",
        #nails,
        "Stunning rose gold gel finish nails, perfect for any occasion.",
        3000,
        "https://example.com/rose-gold-nails.jpg",
        80,
        ["gel", "shiny", "trendy"],
      ),
      (
        "Colorful Ombre Nails",
        #nails,
        "Vibrant ombre effect artificial nails, available in multiple colors.",
        2800,
        "https://example.com/ombre-nails.jpg",
        60,
        ["colorful", "ombre", "unique"],
      ),
      (
        "Sterling Silver Necklace",
        #jewellery,
        "Elegant sterling silver necklace with a minimalist pendant.",
        4000,
        "https://example.com/silver-necklace.jpg",
        30,
        ["silver", "minimalist", "necklace"],
      ),
      (
        "Gold Hoop Earrings",
        #jewellery,
        "Timeless gold hoop earrings, perfect for any outfit.",
        3500,
        "https://example.com/gold-hoop-earrings.jpg",
        50,
        ["gold", "classic", "earrings"],
      ),
      (
        "Crystal Drop Bracelet",
        #jewellery,
        "Beautiful crystal drop bracelet for special occasions.",
        3200,
        "https://example.com/crystal-bracelet.jpg",
        40,
        ["crystal", "bracelet", "elegant"],
      ),
    ];

    for (product in initialProducts.values()) {
      ignore await addProduct(
        product.0,
        product.1,
        product.2,
        product.3,
        product.4,
        product.5,
        product.6,
      );
    };
  };
};
