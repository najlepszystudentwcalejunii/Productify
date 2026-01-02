import { db } from "./index";
import { eq } from "drizzle-orm";
import {
  comments,
  NewComment,
  NewProduct,
  NewUser,
  products,
  users,
} from "./schema";

// USER QUERIES

export const createUser = async (data: NewUser) => {
  const [user] = await db.insert(users).values(data).returning();
  return user;
};

export const getUserById = async (id: string) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  });
};

export const updateUser = async (id: string, data: Partial<NewUser>) => {
  const [user] = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();
  return user;
};

export const upsertUser = async (data: NewUser) => {
  const existingUser = await getUserById(data.id);
  if (!existingUser) {
    return createUser(data);
  }
  return updateUser(data.id, data);
};

//COMMENT QUERIES

export const createComment = async (data: NewComment) => {
  const [comment] = await db.insert(comments).values(data).returning();
  return comment;
};

export const getCommentById = async (id: string) => {
  return db.query.comments.findFirst({
    where: eq(comments.id, id),
    with: { users: true },
  });
};

export const deleteComment = async (id: string) => {
  const [comment] = await db
    .delete(comments)
    .where(eq(comments.id, id))
    .returning();

  return comment;
};

//PRODUCT QUERIES

export const createProduct = async (data: NewProduct) => {
  const [product] = await db.insert(products).values(data).returning();
  return product;
};

export const getAllProducts = async () => {
  return db.query.products.findMany({
    with: { users: true },
    orderBy: (products, { desc }) => [desc(products.createdAt)],
  });
};

export const getProductById = async (id: string) => {
  return db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      users: true,
      comments: {
        with: { users: true },
        orderBy: (comments, { desc }) => [desc(comments.createdAt)],
      },
    },
  });
};

export const getProductsByUserId = async (id: string) => {
  return db.query.products.findMany({
    where: eq(products.userId, id),
    with: { users: true },
    orderBy: (products, { desc }) => [desc(products.createdAt)],
  });
};

export const updateProduct = async (id: string, data: Partial<NewProduct>) => {
  const [product] = await db
    .update(products)
    .set(data)
    .where(eq(products.id, id))
    .returning();
  return product;
};
