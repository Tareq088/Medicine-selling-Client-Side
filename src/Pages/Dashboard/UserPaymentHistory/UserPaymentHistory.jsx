import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../Components/Loading/Loading";


const UserPaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["user-payment-history", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/doneBy/user?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });
  console.log(payments)
  if (isLoading) return <Loading></Loading>;

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold mb-4 text-center text-blue-600">My Order</h2>

      <div className="overflow-x-auto">
        <table className="table w-full text-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>{payment.transactionId}</td>
                <td>৳ {payment.amount}</td>
                <td>{payment.paymentMethod.join(", ")|| "N/A"}</td>
                <td>{new Date(payment.paidAtTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPaymentHistory;
