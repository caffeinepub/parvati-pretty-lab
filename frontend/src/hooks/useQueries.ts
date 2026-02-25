import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Product, ProductCategory, OrderItem, ShippingAddress } from '@/backend';

export function useGetAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProductsByCategory(category: ProductCategory) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ['products', 'category', category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProduct(id: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Product>({
    queryKey: ['product', id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) throw new Error('No actor or id');
      return actor.getProduct(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useCreateOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      customerName,
      email,
      shippingAddress,
      items,
    }: {
      customerName: string;
      email: string;
      shippingAddress: ShippingAddress;
      items: OrderItem[];
    }) => {
      if (!actor) throw new Error('No actor');
      return actor.createOrder(customerName, email, shippingAddress, items);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useSeedProducts() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('No actor');
      return actor.seedProducts();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useGetAllOrders() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOrders();
    },
    enabled: !!actor && !isFetching,
  });
}
