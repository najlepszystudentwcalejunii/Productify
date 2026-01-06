import {
  EditIcon,
  EyeIcon,
  PackageIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import LoadingSpinner from "../components/loading-spinner";
import { useDeleteProduct, useUserProducts } from "../hooks/useProducts";

const ProfilePage = () => {
  const navigate = useNavigate();

  const { data: products, isLoading } = useUserProducts();
  const deleteProduct = useDeleteProduct();

  const handleDelete = (id: string) => {
    if (confirm("Delete this product?")) deleteProduct.mutate(id);
  };

  //if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">My products</h1>
          <p className="text-base-content/60 text-sm">Manage your listings</p>
        </div>
        <Link to={"/create"} className="btn btn-primary">
          <PlusIcon className="size-4" /> New
        </Link>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="stats bg-base-300 w-full">
            <div className="stat">
              <h2 className="stat-title">Total products</h2>
              <p className="text-primary stat-value">{products?.length || 0}</p>
            </div>
          </div>

          {products?.length === 0 ? (
            <div className="card bg-base-300">
              <div className="card-body items-center text-center py-18">
                <PackageIcon className="size-16 text-base-content/20" />
                <h3 className="card-title text-base-content/50">
                  No products yet
                </h3>
                <p className="text-base-content/40 text-sm">
                  Start by creating your first product
                </p>
                <Link to="/create" className="btn btn-primary btn-sm mt-4">
                  Create Product
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {products?.map((product) => (
                <div key={product.id} className="card card-side bg-base-200">
                  <figure className="w-32 shrink-0">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="h-full object-cover"
                    />
                  </figure>
                  <div className="card-body p-4">
                    <h2 className="card-title text-base">{product.title}</h2>
                    <p className="text-base-content/70 text-sm line-clamp-1">
                      {product.description}
                    </p>
                    <div className="card-actions justify-end mt-2">
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        <EyeIcon className="size-4" />
                        View
                      </button>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => navigate(`/edit/${product.id}`)}
                      >
                        <EditIcon className="size-4" />
                        Edit
                      </button>
                      <button
                        className="btn btn-ghost btn-error btn-sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2Icon className="size-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
