import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, getAllProducts } from "../lib/api";
import type { ProductWithUser } from "../types/api";

export type { ProductWithUser };

export const useProducts = () => {
  const results = useQuery<ProductWithUser[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  return results;
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProduct,
  });
};
