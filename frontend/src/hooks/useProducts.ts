import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getUserProducts,
  updateProduct,
} from "../lib/api";
import type {
  Product,
  ProductWithUser,
  ProductWithUserAndComments,
} from "../types/api";

export type { ProductWithUser };

export const useProducts = () => {
  return useQuery<ProductWithUser[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProduct,
  });
};
export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: updateProduct,
  });
};

export const useProduct = (id: string) => {
  return useQuery<ProductWithUserAndComments>({
    queryFn: () => getProductById(id),
    queryKey: ["product", id],
    enabled: !!id,
  });
};

export const useUserProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["myProducts"],
    queryFn: getUserProducts,
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["myProducts"],
      }),
  });
};
