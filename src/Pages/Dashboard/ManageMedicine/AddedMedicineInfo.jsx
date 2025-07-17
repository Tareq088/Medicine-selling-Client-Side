import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../Components/Loading/Loading";


const AddedMedicineInfo = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // Must provide user.email
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'

              // pagination
   const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // const { data: medicines = [], isLoading } = useQuery({
  //   queryKey: ["medicines-email", user?.email, searchTerm, sortOrder],
  //   queryFn: async () => {const res = await axiosSecure.get(`/medicines/email?sellerEmail=${user.email}&search=${searchTerm}&sort=${sortOrder}`);
  //     return res.data;
  //   },
  //   enabled: !!user?.email,
  // });

   const { data, isLoading, refetch } = useQuery({
    queryKey: ["medicines-email", user?.email, searchTerm, sortOrder, currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/medicines/email?sellerEmail=${user.email}&search=${searchTerm}&sort=${sortOrder}&page=${currentPage}&size=${itemsPerPage}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const medicines = data?.medicines || [];
  const totalMedicines = data?.totalMedicines || 0;
  const totalPages = Math.ceil(totalMedicines / itemsPerPage);
  const pages = [...Array(totalPages).keys()];

  const handleItemsPerPage = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (user?.email) {
      refetch();
    }
  }, [searchTerm, sortOrder, currentPage, itemsPerPage, user?.email, refetch]);
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
              {medicines?.map((med, i) => (
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
      {/* ✅ Pagination Controls */}
      <div className="pagination flex gap-2 mt-4">
        <button onClick={handlePreviousPage} className="btn btn-sm">Prev</button>

        {pages.map((page) => (
          <button
            key={page}
            className={`btn btn-sm ${currentPage === page ? 'btn-primary' : ''}`}
            onClick={() => setCurrentPage(page)}
          >
            {page + 1}
          </button>
        ))}

        <button
          onClick={() => {
            if (currentPage < totalPages - 1) {
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

    </div>
  );
};

export default AddedMedicineInfo;
