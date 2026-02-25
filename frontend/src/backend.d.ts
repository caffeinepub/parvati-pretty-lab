import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Order {
    id: bigint;
    customerName: string;
    email: string;
    shippingAddress: ShippingAddress;
    items: Array<OrderItem>;
    totalPrice: bigint;
}
export interface ShippingAddress {
    street: string;
    city: string;
    postalCode: string;
    state: string;
}
export interface OrderItem {
    productId: bigint;
    quantity: bigint;
}
export interface Product {
    id: bigint;
    stockQuantity: bigint;
    name: string;
    tags: Array<string>;
    description: string;
    imageUrl: string;
    category: ProductCategory;
    price: bigint;
}
export enum ProductCategory {
    jewellery = "jewellery",
    nails = "nails"
}
export interface backendInterface {
    addProduct(name: string, category: ProductCategory, description: string, price: bigint, imageUrl: string, stockQuantity: bigint, tags: Array<string>): Promise<bigint>;
    createOrder(customerName: string, email: string, shippingAddress: ShippingAddress, items: Array<OrderItem>): Promise<bigint>;
    getAllOrders(): Promise<Array<Order>>;
    getAllProducts(): Promise<Array<Product>>;
    getProduct(id: bigint): Promise<Product>;
    getProductsByCategory(category: ProductCategory): Promise<Array<Product>>;
    seedProducts(): Promise<void>;
    updateProductStock(productId: bigint, quantity: bigint): Promise<void>;
}
