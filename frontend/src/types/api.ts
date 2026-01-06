export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
export interface NewProduct {
  imageUrl: string;
  title: string;
  description: string;
  userId: string;
  id?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

export interface User {
  id: string;
  email: string;
  name: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewUser {
  id: string;
  email: string;
  name?: string | null | undefined;
  imageUrl?: string | null | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

export interface ProductWithUser extends Product {
  users: User;
}

export interface ProductWithUserAndComments extends ProductWithUser {
  comments: CommentWithUser[];
}

export interface Comment {
  id: string;
  createdAt: Date;
  userId: string;
  content: string;
  productId: string;
}

export interface NewComment {
  userId: string;
  content: string;
  productId: string;
  id?: string | undefined;
  createdAt?: Date | undefined;
}

export interface CommentWithUser extends Comment {
  users: User;
}
