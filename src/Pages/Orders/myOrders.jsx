import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { MdReceiptLong } from "react-icons/md";
import Loading from "../../Components/Loading/Loading";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { ReTitle } from "re-title";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["userOrders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`orders?userEmail=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
console.log(orders)
  return (
    <div className="p-6">
      <ReTitle title="Medion|Payment History"/>
      <h2 className="text-4xl font-bold mb-6 flex items-center gap-2 justify-center text-blue-600">
        <MdReceiptLong /> {user.displayName}'s Payment History
      </h2>

      {isLoading ? (
        <Loading></Loading>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-xl">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Total Items</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Track ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={order._id}>
                  <td>{idx + 1}</td>
                  <td>{format(new Date(order.createdAt), "PPP p")}</td>
                  <td>{order.items.length}</td>
                  <td>৳ {order.totalAmount}</td>
                  <td>
                    <span
                      className={`badge ${
                        order.paymentStatus === "paid"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td>{order.trackId}</td>
                  <td>
                    {order.paymentStatus === "un-paid" ? (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => navigate(`/checkOut/${order._id}`)}
                      >
                        Pay Now
                      </button>
                    ) : (
                      <span className="text-green-600 font-semibold">Paid</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
