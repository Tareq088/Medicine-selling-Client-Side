import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";

import Loading from "../../Components/Loading/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";

const Shop = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const { data: medicines = [], isLoading } = useQuery({
    queryKey: ["allMedicines"],
    queryFn: async () => {
      const res = await axiosSecure.get("/medicines");
      return res.data;
    },
  });

  const handleAddToCart = async (medicine) => {
    if (!user?.email) {
      toast.error("Please log in to add to cart");
      return;
    }

    const cartItem = {
      userEmail: user.email,
      medicineId: medicine._id, // Can be ObjectId or string depending on backend handling
      medicineName: medicine.itemName,
      quantity:parseInt(1),
    };

    try {
      const res = await axiosSecure.post("/carts", cartItem);
      if (res.data.insertedId) {
        toast.success("Added to cart");
      } else if (res.data.exists) {
        toast.error("Already in cart");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Available Medicines</h2>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Generic Name</th>
                <th>Company</th>
                <th>Unit Price <br />(in Tk)</th>
                <th>Discount</th>
                <th>Seller</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((med, i) => (
                <tr key={med._id}>
                  <td>{i + 1}</td>
                  <td>
                    <img
                      src={med.image}
                      alt={med.itemName}
                      className="w-12 h-12 rounded"
                    />
                  </td>
                  <td>{med.itemName}</td>
                  <td>{med.genericName}</td>
                  <td>{med.company}</td>
                  <td>৳ {med.price}</td>
                  <td>{med.discount}%</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <img
                        src={med.sellerImage}
                        className="w-6 h-6 rounded-full"
                        alt="seller"
                      />
                      <span>{med.sellerName}</span>
                    </div>
                  </td>
                  <td className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => setSelectedMedicine(med)}
                      className="btn btn-sm btn-info"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleAddToCart(med)}
                      className="btn btn-sm btn-success"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for details */}
      {selectedMedicine && (
        <dialog id="medicine_modal" className="modal modal-open">
          <form method="dialog" className="modal-box max-w-2xl">
            <h3 className="font-bold text-2xl mb-4">
              {selectedMedicine.itemName}
            </h3>
            <div className="flex flex-col md:flex-row gap-4">
              <img
                src={selectedMedicine.image}
                alt={selectedMedicine.itemName}
                className="w-48 h-48 object-cover rounded border"
              />
              <div className="space-y-2">
                <p><strong>Generic:</strong> {selectedMedicine.genericName || "N/A"}</p>
                <p><strong>Description:</strong> {selectedMedicine.description}</p>
                <p><strong>Category:</strong> {selectedMedicine.category}</p>
                <p><strong>Company:</strong> {selectedMedicine.company}</p>
                <p><strong>Unit:</strong> {selectedMedicine.unit || "N/A"}</p>
                <p><strong>Price:</strong> ৳ {selectedMedicine.price}</p>
                <p><strong>Discount:</strong> {selectedMedicine.discount}%</p>
                <p>
                  <strong>Seller:</strong> {selectedMedicine.sellerName} (
                  {selectedMedicine.sellerEmail})
                </p>
              </div>
            </div>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setSelectedMedicine(null)}
              >
                Close
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default Shop;
