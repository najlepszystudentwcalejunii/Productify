import { getAuth } from "@clerk/express";
import { Request, Response } from "express";
import * as queries from "../db/queries";

export async function createComment(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(403).json({ error: "Unauthenticated" });

    const { productId } = req.params;
    const { content } = req.body;

    if (!content)
      return res.status(400).json({ error: "Comment content is required" });

    const product = await queries.getProductById(productId);
    if (!product)
      return res.status(404).json({ error: "Product with this id not found" });

    const comment = await queries.createComment({
      content,
      productId,
      userId,
    });
    return res.status(201).json(comment);
  } catch (err) {
    console.error("Error when creating a comment", err);
    return res.status(500).json({ error: "Failed to create a comment" });
  }
}
export async function deleteComment(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(403).json({ error: "Unauthenticated" });

    const { commentId } = req.params;

    const comment = await queries.getCommentById(commentId);
    if (!comment) return res.status(404).json({ error: "Product not found" });

    if (comment.userId !== userId)
      return res
        .status(403)
        .json({ error: "You can only delete your own comments" });

    await queries.deleteComment(commentId);
    return res.status(200).json(comment);
  } catch (err) {
    console.error("Error when deleting a comment", err);
    return res.status(500).json({ error: "Failed to delete a comment" });
  }
}
