import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import useAxiosSecure from './../../../Hooks/useAxiosSecure';


const AdminPaymentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Get all payments
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments/all");
      return res.data;
    }
  });
console.log(payments)
  // Mutation to accept payment
  const acceptPaymentMutation = useMutation({
    mutationFn: async (orderId) => {
      const res = await axiosSecure.patch(`/orders/${orderId}/accept-payment`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Payment accepted successfully");
      queryClient.invalidateQueries(["admin-payments"]);
    },
    onError: () => {
      toast.error("Failed to accept payment");
    }
  });

  const handleAcceptPayment = (orderId) => {
    acceptPaymentMutation.mutate(orderId);
  };

  if (isLoading) return <p>Loading payments...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Admin Payment Management</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User Email</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, idx) => (
              <tr key={payment._id}>
                <td>{idx + 1}</td>
                <td>{payment.userEmail}</td>
                <td>{payment.transactionId}</td>
                <td>৳ {payment.amount}</td>
                <td>{payment.paymentMethod?.join(", ")}</td>
                <td>{payment.orderInfo?.paymentStatus}</td>
                <td>
                  {payment.orderInfo?.paymentStatus === "pending" ? (
                    <button
                      onClick={() => handleAcceptPayment(payment.orderId)}
                      className="btn btn-success btn-sm"
                      disabled={acceptPaymentMutation.isLoading}
                    >
                      Accept Payment
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
    </div>
  );
};

export default AdminPaymentManagement;
