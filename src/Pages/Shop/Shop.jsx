import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";
import Loading from "../../Components/Loading/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { ReTitle } from "re-title";
import { convertOffsetToTimes } from "framer-motion";

const Shop = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
        //sorting
  const [sortOrder, setSortOrder] = useState("asc");
const [searchTerm, setSearchTerm] = useState("");

                  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

              //sorting, searchn=ing, data for skip, limit
  const { data, isLoading, refetch } = useQuery({
  queryKey: ["allMedicines", currentPage, itemsPerPage, sortOrder, searchTerm],
  queryFn: async () => {
    const res = await axiosSecure.get(
      `/medicines?page=${currentPage}&size=${itemsPerPage}&search=${searchTerm}&sort=${sortOrder}`
    );
    return res.data;
  },
  enabled: !!user?.email,
});
const medicines = data?.medicines || [];
console.log(medicines)
          // for pagination
const totalMedicines = data?.totalMedicines || 0;
const handleItemsPerPage = (e) => {
  setItemsPerPage(parseInt(e.target.value));
  setCurrentPage(0);
};

const totalPages = Math.ceil(totalMedicines / itemsPerPage);
const pages = [...Array(totalPages).keys()];

const handlePreviousPage = () => {
  if (currentPage > 0) {
    setCurrentPage(currentPage - 1);
  }
};



useEffect(() => {
  if (user?.email) {
    refetch();
  }
}, [sortOrder, searchTerm, user?.email, refetch]);


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
      <ReTitle title="Medion|Shop"/>
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Available Medicines</h2>
      <div className="flex justify-between mb-4">
  <input
    type="text"
    placeholder="Search medicines... by Name, Generic Name, Company Name"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="input input-bordered w-full max-w-md"
  />

  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
    className="select select-bordered max-w-xs"
  >
    <option value="asc">Price: Low to High</option>
    <option value="desc">Price: High to Low</option>
  </select>
</div>

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
                   {/* design for pagination */}
      <div className="pagination flex gap-2 mt-4">
        <button onClick={handlePreviousPage} className="btn btn-sm">Prev</button>

        {pages.map((page) => (
          <button
            className={`btn btn-sm ${currentPage === page ? 'btn-primary' : ''}`}
            onClick={() => setCurrentPage(page)}
            key={page}
          >
            {page + 1}
          </button>
        ))}

        <button
          onClick={() => {
            if (currentPage < pages.length - 1) {
              setCurrentPage(currentPage + 1);
            }
          }}
          className="btn btn-sm"
        >
          Next
        </button>

        <select
          value={itemsPerPage}
          onChange={handleItemsPerPage}
          className="select select-bordered select-sm ml-2"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>


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
