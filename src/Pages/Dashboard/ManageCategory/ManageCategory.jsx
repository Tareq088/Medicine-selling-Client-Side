import { useForm } from "react-hook-form";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import { imagUploadURl } from "../../../API/Utlities";


const ManageCategory = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/categories");
      return res.data;
    }
  });

  const addCategoryMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/categories", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      toast.success("Category added");
      reset();
      setIsModalOpen(false);
    }
  });

  const updateCategoryMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.patch(`/categories/${data._id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      toast.success("Category updated");
      setSelectedCategory(null);
      setIsModalOpen(false);
    }
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/categories/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      toast.success("Category deleted");
    }
  });

  const onSubmit = async (data) => {
    try {
      let imageURL = selectedCategory?.categoryImage;

      // If new image is uploaded
      if (data.categoryImageFile && data.categoryImageFile[0]) {
        imageURL = await imagUploadURl(data.categoryImageFile[0]);
      }

      const categoryData = {
        categoryName: data.categoryName,
        categoryImage: imageURL,
      };

      if (selectedCategory) {
        updateCategoryMutation.mutate({ ...categoryData, _id: selectedCategory._id });
      } else {
        addCategoryMutation.mutate(categoryData);
      }
    } catch (err) {
      toast.error("Image upload failed.");
      console.error(err);
    }
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold mb-4 text-blue-600 text-center">Manage Categories</h2>

      <button
        onClick={() => {
          setSelectedCategory(null);
          setIsModalOpen(true);
        }}
        className="btn btn-success mb-4 text-black text-center mx-auto block"
      >
        Add Category
      </button>

      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr key={cat._id}>
              <td>{index + 1}</td>
              <td>{cat.categoryName}</td>
              <td>
                <img src={cat.categoryImage} alt={cat.categoryName} className="w-12 h-12 object-cover" />
              </td>
              <td>
                <button
                  className="btn btn-sm btn-warning mr-2"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => deleteCategoryMutation.mutate(cat._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              {selectedCategory ? "Update Category" : "Add New Category"}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {/* Category name */}
              <input
                defaultValue={selectedCategory?.categoryName || ""}
                {...register("categoryName", { required: true })}
                placeholder="Category Name"
                className="input input-bordered w-full"
              />

              {/* Image upload */}
              <label className="block font-medium">Category Image {selectedCategory && "(upload new to replace)"}</label>
              <input
                type="file"
                accept="image/*"
                {...register("categoryImageFile")}
                className="file-input file-input-bordered w-full"
              />

              {selectedCategory?.categoryImage && (
                <img
                  src={selectedCategory.categoryImage}
                  alt="Current"
                  className="w-24 h-24 object-cover mt-2"
                />
              )}

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  {selectedCategory ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageCategory;
