import { useQuery } from "@tanstack/react-query";
import { FaMoneyBillWave, FaClock, FaCheckCircle } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: salesData = {}, isLoading } = useQuery({
    queryKey: ["adminSalesStats"],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/sales-stats');
      return res.data;
    }
  });

  if (isLoading) return <Loading />;

  const { totalRevenue, totalPaid, totalPending } = salesData;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Admin Dashboard - Sales Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-100 shadow-md rounded-lg p-5 flex items-center space-x-4">
          <FaMoneyBillWave className="text-4xl text-green-500" />
          <div>
            <p className="text-lg font-semibold text-gray-700">Total Revenue</p>
            <p className="text-xl font-bold text-green-600">৳ {totalRevenue}</p>
          </div>
        </div>

        <div className="bg-blue-100 shadow-md rounded-lg p-5 flex items-center space-x-4">
          <FaCheckCircle className="text-4xl text-blue-500" />
          <div>
            <p className="text-lg font-semibold text-gray-700">Total Paid</p>
            <p className="text-xl font-bold text-blue-600">৳ {totalPaid}</p>
          </div>
        </div>

        <div className="bg-yellow-100 shadow-md rounded-lg p-5 flex items-center space-x-4">
          <FaClock className="text-4xl text-yellow-500" />
          <div>
            <p className="text-lg font-semibold text-gray-700">Total Pending</p>
            <p className="text-xl font-bold text-yellow-600">৳ {totalPending}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
