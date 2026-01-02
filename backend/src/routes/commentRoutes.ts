import { Router } from "express";
import { createComment, deleteComment } from "../controllers/commentController";
import { requireAuth } from "@clerk/express";

const router = Router();

router.post("/:productId", requireAuth(), createComment);
router.delete("/:commentId", requireAuth(), deleteComment);

export default router;
