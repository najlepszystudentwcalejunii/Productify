import { useState } from "react";
import type { NewProduct, Product } from "../types/api";
import { Link } from "react-router";
import {
  ArrowLeftIcon,
  FileTextIcon,
  ImageIcon,
  SaveIcon,
  TypeIcon,
} from "lucide-react";

interface Props {
  product: Product;
  isPending: boolean;
  isError: boolean;
  onSubmit: (formData: NewProduct) => void;
}

const EditProductForm = ({ isError, isPending, onSubmit, product }: Props) => {
  const [formData, setFormData] = useState<NewProduct>({
    title: product.title,
    description: product.description,
    imageUrl: product.imageUrl,
    userId: product.userId,
  });
  return (
    <div className="max-w-lg mx-auto">
      <Link to={"/profile"} className="btn btn-ghost btn-sm gap-1 mb-4">
        <ArrowLeftIcon className="size-4" />
        Back
      </Link>

      <div className="card bg-base-300">
        <div className="card-body">
          <h1 className="card-title">
            <SaveIcon className="size-5 text-primary" />
            Edit Product
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(formData);
            }}
            className="space-y-4 mt-4"
          >
            <label className="input input-bordered flex items-center gap-2 bg-base-200">
              <TypeIcon className="size-4 text-base-content/50" />
              <input
                type="text"
                placeholder="Product Title"
                className="grow"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 bg-base-200">
              <ImageIcon className="size-4 text-base-content/50" />
              <input
                type="url"
                placeholder="Image URL"
                className="grow"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                required
              />
            </label>

            {formData.imageUrl && (
              <div className="rounded-box overflow-hidden">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full h-50 object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                  onLoad={(e) => (e.currentTarget.style.display = "block")}
                />
              </div>
            )}

            <div className="form-control">
              <div className="flex items-start gap-2 p-3 rounded-box bg-base-200 border border-base-300">
                <FileTextIcon className="size-4 text-base-content/50 mt-1" />
                <textarea
                  placeholder="Product Description"
                  className="grow resize-none bg-transparent focus:outline-none min-h-24"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            {isError && (
              <div className="alert alert-error alert-sm" role="alert">
                <span>Failed to update. Try again.</span>
              </div>
            )}
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner" />
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditProductForm;
