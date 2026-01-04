import { Link } from "react-router";
import type { ProductWithUser } from "../hooks/useProducts";

const oneWeekAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);

const ProductCard = ({ product }: { product: ProductWithUser }) => {
  const isNew = new Date(product.createdAt) > oneWeekAgo;
  return (
    <Link
      to={`/product/${product.id}`}
      className="card bg-base-300 hover:bg-base-200 rounded-lg transition-colors"
    >
      <div className="card-body flex flex-col space-y-2">
        <img
          src={product.imageUrl}
          alt="Product image"
          className="mx-4 rounded-lg object-cover h-60"
        />

        <h1 className="card-title text-base">
          {product.title}
          {isNew && <span className="badge badge-secondary badge-sm">NEW</span>}
        </h1>
        <p className="text-sm text-base-content/70 line-clamp-5">
          {product.description}
        </p>
        <hr className="text-base-content/20" />
        <div className="flex items-center gap-x-4">
          {product.users.imageUrl && (
            <img
              src={product.users.imageUrl}
              alt="User Profile Image"
              className="size-9 rounded-full"
            />
          )}
          <span className="text-base-content/60 ">{product.users.name}</span>
        </div>
      </div>
    </Link>
  );
};
export default ProductCard;
