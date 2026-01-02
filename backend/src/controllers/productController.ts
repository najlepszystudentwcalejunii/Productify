import { Request, Response } from "express";
import * as queries from "../db/queries";
import { getAuth, requireAuth } from "@clerk/express";

export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await queries.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to get products" });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const product = await queries.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Failed to get a product" });
  }
}

export async function getUserProducts(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const products = await queries.getProductsByUserId(userId);
    res.status(200).json(products);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { imageUrl, title, description } = req.body;
    if (!imageUrl || !title || !description) {
      return res
        .status(400)
        .json({ error: "Title, description and image URL are required" });
    }

    const product = await queries.createProduct({
      title,
      description,
      imageUrl,
      userId,
    });
    res.status(201).json(product);
  } catch (err) {
    console.error("Error creating a product:", err);
    res.status(500).json({ error: "Failed to create a product" });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const { title, description, imageUrl } = req.body;
    const existingProduct = await queries.getProductById(id);
    if (!existingProduct)
      return res.status(404).json({ error: "Product not found" });

    if (existingProduct.userId !== userId)
      return res
        .status(403)
        .json({ error: "You can only update your own products" });

    const product = await queries.updateProduct(id, {
      title,
      description,
      imageUrl,
    });
    return res.status(200).json(product);
  } catch (err) {
    console.error("Error updating a product:", err);
    res.status(500).json({ error: "Failed to update a product" });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;

    const product = await queries.getProductById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    if (product.userId !== userId)
      return res
        .status(403)
        .json({ error: "You can only update your own products" });

    await queries.deleteProduct(id);
    return res.status(200).json(product);
  } catch (err) {
    console.error("Error deleting a product:", err);
    res.status(500).json({ error: "Failed to delete a product" });
  }
}
