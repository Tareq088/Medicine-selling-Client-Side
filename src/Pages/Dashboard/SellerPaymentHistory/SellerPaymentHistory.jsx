import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";


const SellerPaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: history = [], isLoading } = useQuery({
    queryKey: ["seller-payment-history", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/seller/paymentHistory?sellerEmail=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  if (isLoading) return <p>Loading payment history...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Seller Payment History</h2>
      <div className="overflow-x-auto">
        <table className="table w-full text-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Medicine Name</th>
              <th>Buyer Email</th>
              <th>Quantity</th>
              <th>Price Per Unit</th>
              <th>Discount</th>
              <th>Subtotal</th>
              <th>Payment Status</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record, index) => (
              <tr key={record._id}>
                <td>{index + 1}</td>
                <td>{record.medicineName}</td>
                <td>{record.buyerEmail}</td>
                <td>{record.quantity}</td>
                <td>৳ {record.price}</td>
                <td>{record.discount}%</td>
                <td>৳ {(record.price - (record.price * record.discount) / 100) * record.quantity}</td>
                <td>
                  <span className={`badge ${record.paymentStatus === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                    {record.paymentStatus}
                  </span>
                </td>
                <td>{new Date(record.orderDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerPaymentHistory;
