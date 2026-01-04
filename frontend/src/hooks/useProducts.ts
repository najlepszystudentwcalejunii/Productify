import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, getAllProducts } from "../lib/api";
import type { Product, User } from "../../../backend/src/db/schema";

export interface ProductWithUser extends Product {
  users: User;
}

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
