import { type NewProduct, type NewUser, type Product } from "../types/api";
import api from "./axios";

export const syncUser = async (userData: Omit<NewUser, "id">) => {
  const { data } = await api.post("/users/sync", userData);
  return data;
};

export const getAllProducts = async () => {
  const { data } = await api.get(`/products`);
  return data;
};

export const getUserProducts = async () => {
  const { data } = await api.get("/products/my");
  return data;
};

export const createProduct = async (productData: NewProduct) => {
  const { data } = await api.post("/products", productData);
  return data;
};

export const updateProduct = async ({ id, ...productData }: Product) => {
  const { data } = await api.put(`/products/${id}`, productData);
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

export const createComment = async (commentData: Comment) => {
  const { data } = await api.post("/comments", commentData);
  return data;
};

export const deleteComment = async (id: string) => {
  const { data } = await api.delete(`/comments/${id}`);
  return data;
};
