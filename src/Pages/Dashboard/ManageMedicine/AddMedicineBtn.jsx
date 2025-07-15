import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { imagUploadURl } from "../../../API/Utlities";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../Components/Loading/Loading";

const AddMedicineBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  console.log(user)

  const {register,handleSubmit,reset,formState: { errors },} = useForm();
  const { data: Allcategory = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/categories");
      return res.data;
    }
  });
  
  const categories = Allcategory.map(item => item.categoryName);
  // console.log(categories)
  // ✅ Hardcoded categories and companies
// const categories = ["Medicine", "Healthcare", "Beauty Care", "Sexual Wellness", "Fitness",
//   "Lab Test","Baby & Mom Care", "Supplement", "Food & Nutrition", "Equipments", "Medical Supplies", "Pet Care", "Others",];

  const companies = [ "Square", "Beximco", "Renata", "Acme", "Opsonin", "Eskayef", "Incepta","others"];

  const mutation = useMutation({
    mutationFn: async (medicine) => {
      const res = await axiosSecure.post("/medicines", medicine);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Medicine added successfully!");
      queryClient.invalidateQueries(["medicines"]);
      reset();
      setIsModalOpen(false);
    },
    onError: () => {
      toast.error("Failed to add medicine.");
    },
  });

  const onSubmit = async (data) => {
    try {
      const imageFile = data.image[0];
      if (!imageFile) return toast.error("Image is required.");

      const imageUrl = await imagUploadURl(imageFile);

      const newMedicine = {
        itemName: data.itemName,
        genericName: data.genericName,
        description: data.description,
        image: imageUrl,
        category: data.category,
        company: data.company,
        unit: `${data.massValue}${data.massUnit}`, // ← Combine value + unit
        price: parseFloat(data.price),
        discount: parseFloat(data.discount) || 0,
        createdAt: new Date().toISOString(),
        sellerName:user.displayName,
        sellerImage:user.photoURL,
        sellerEmail:user.email,
      };
      console.log(newMedicine)
      mutation.mutate(newMedicine);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };
  if(isLoading) return <Loading></Loading>
  return (
    <div className="text-center">
      <button onClick={() => setIsModalOpen(true)} className="btn btn-primary text-black">
        <FaPlus className="mr-2" />
        Add Medicine
      </button>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Add New Medicine</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                {/* item name */}
              <div>
                <label className="label">Item Name</label>
                <input
                  {...register("itemName", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Item name"
                />
                {errors.itemName && <p className="text-red-500">Required</p>}
              </div>
                                    {/*generic name */}
              <div>
                <label className="label">Generic Name</label>
                <input
                  {...register("genericName")}
                  className="input input-bordered w-full"
                  placeholder="Generic name"
                />
                {/* {errors.genericName && <p className="text-red-500">Required</p>} */}
              </div>
                                {/* description */}
              <div>
                <label className="label">Short Description</label>
                <textarea
                  {...register("description")}
                  className="textarea textarea-bordered w-full"
                  placeholder="Short description"
                />
              </div>
                                {/* image */}
              <div>
                <label className="label">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("image", { required: true })}
                  className="file-input file-input-bordered w-full"
                />
                {errors.image && (
                  <p className="text-red-500">Image is required</p>
                )}
              </div>
                                    {/* category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Category</label>
                  <select
                    {...register("category", { required: true })}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-500">Required</p>}
                </div>
                                        {/* company */}
                <div>
                  <label className="label">Company</label>
                  <select
                    {...register("company", { required: true })}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select Company</option>
                    {companies.map((comp, idx) => (
                      <option key={idx} value={comp}>
                        {comp}
                      </option>
                    ))}
                  </select>
                  {errors.company && <p className="text-red-500">Required</p>}
                </div>
              </div>
                                        {/* mass unit*/}
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="label">Mass</label>
                    <div className="flex gap-2">
                        <input
                        type="number"
                        step="0.01"
                        {...register("massValue")}
                        className="input input-bordered w-full"
                        placeholder="Enter value (e.g. 500)"
                        />
                        <select
                        {...register("massUnit")}
                        className="select select-bordered w-32"
                        >
                        <option value="">Unit</option>
                        <option value="mg">mg</option>
                        <option value="ml">ml</option>
                        </select>
                    </div>
                    {/* {(errors.massValue || errors.massUnit) && (
                        <p className="text-red-500 mt-1">Mass value and unit are required</p>
                    )} */}
                </div>

                                    {/* price per unit */}
                <div>
                  <label className="label">Price (Per Unit)</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("price", { required: true })}
                    className="input input-bordered w-full"
                    placeholder="0.00"
                  />
                </div>
              </div>
                                {/* discount */}
              <div>
                <label className="label">Discount (%)</label>
                <input
                  type="number"
                  step="0.01"
                  defaultValue={0}
                  {...register("discount")}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="modal-action">
                <button
                  type="submit"
                  className="btn btn-primary text-black"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Submitting..." : "Submit"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsModalOpen(false);
                    reset();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMedicineBtn;
