import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../Components/Loading/Loading";


const AddedMedicineInfo = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // Must provide user.email

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'

  const { data: medicines = [], isLoading } = useQuery({
    queryKey: ["medicines-email", user?.email, searchTerm, sortOrder],
    queryFn: async () => {const res = await axiosSecure.get(`/medicines/email?sellerEmail=${user.email}&search=${searchTerm}&sort=${sortOrder}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">My Added Medicines</h2>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name, generic, company, description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />

        {/* Sort select */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-bordered"
        >
          <option value="asc">Sort by Price: Low → High</option>
          <option value="desc">Sort by Price: High → Low</option>
        </select>

        <span className="ml-auto text-sm text-gray-500">
          {medicines.length} found
        </span>
      </div>

      {/* Table */}
      {isLoading ? 
      (
        <Loading></Loading>
      ) 
      : 
      medicines.length === 0 ? 
      (
        <p className="text-lg text-red-500">No medicines found.</p>
      ) 
      : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Generic</th>
                <th>Company</th>
                <th>Category</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Discount</th>
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
                  <td>{med.category}</td>
                  <td>{med.unit}</td>
                  <td>৳ {med.price}</td>
                  <td>{med.discount}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddedMedicineInfo;
