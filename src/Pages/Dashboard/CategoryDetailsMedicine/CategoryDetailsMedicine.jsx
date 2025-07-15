import { useState } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import { useParams } from "react-router";


const CategoryDetailsMedicine = () => {
  const { category } = useParams(); // URL param like /category/Tablet
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  const [selectedMedicine, setSelectedMedicine] = useState(null);
//   const category = "Medicine";
  // Fetch medicines by category
  const { data: medicines = [], isLoading } = useQuery({
    queryKey: ["medicines", category],
    queryFn: async () => {
      const res = await axiosSecure.get(`/medicines/category/${category}`);
      return res.data;
    }
  });

  // Mutation to add to cart
  const addToCartMutation = useMutation({
    mutationFn: async (medicine) => {
      const cartItem = {
        userEmail: user.email,
        medicineId: medicine._id,
        medicineName: medicine.itemName,
        quantity: 1,
      };
      return await axiosSecure.post("/carts", cartItem);
    },
    onSuccess: () => {
      toast.success("Added to cart");
      queryClient.invalidateQueries(["cart", user?.email]);
    },
    onError: () => {
      toast.error("Failed to add to cart");
    }
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold mb-4 text-center text-blue-600">Category: <span className="text-red-700">{category}</span></h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Brand</th>
              <th>Generic</th>
              <th>Company</th>
              <th>Unit</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine._id}>
                <td><img src={medicine.image} alt={medicine.itemName} className="w-12 h-12" /></td>
                <td>{medicine.itemName}</td>
                <td>{medicine.genericName || "N/A"}</td>
                <td>{medicine.company}</td>
                <td>{medicine.unit}</td>
                <td>৳ {medicine.price}</td>
                <td className="flex gap-2">
                  <button onClick={() => setSelectedMedicine(medicine)} className="btn btn-sm btn-outline">
                    <FaEye />
                  </button>
                  <button onClick={() => addToCartMutation.mutate(medicine)} className="btn btn-sm btn-primary text-black">
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for details */}
      {selectedMedicine && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{selectedMedicine.itemName}</h3>
            <img src={selectedMedicine.image} alt={selectedMedicine.itemName} className="my-3 w-48 h-48 mx-auto" />
            <p><strong>Generic:</strong> {selectedMedicine.genericName || "N/A"}</p>
            <p><strong>Company:</strong> {selectedMedicine.company}</p>
            <p><strong>Unit:</strong> {selectedMedicine.unit}</p>
            <p><strong>Price:</strong> ৳ {selectedMedicine.price}</p>
            <p><strong>Description:</strong> {selectedMedicine.description}</p>

            <div className="modal-action">
              <button onClick={() => setSelectedMedicine(null)} className="btn">Close</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default CategoryDetailsMedicine;
