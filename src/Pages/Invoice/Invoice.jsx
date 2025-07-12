import { useQuery } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";



const Invoice = () => {
  const { OrderID } = useParams(); // OrderID
  const axiosSecure = useAxiosSecure();
  const componentRef = useRef();
  console.log(OrderID)


  const { data: orderData, isLoading } = useQuery({
    queryKey: ["invoice", OrderID],
    queryFn: async () => {
      const [orderRes, userRes, paymentRes] = await Promise.all([
        axiosSecure.get(`/orders/${OrderID}`),
        axiosSecure.get(`/users/byOrderId?orderId=${OrderID}`),
        axiosSecure.get(`/payments/${OrderID}`),
      ]);
      return {
        order: orderRes.data,
        user: userRes.data,
        payment: paymentRes.data,
      };
    },
    enabled: !!OrderID,
  });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "invoice",
  });

  if (isLoading) return <p className="p-5 text-lg">Loading...</p>;

  const { order, user, payment } = orderData || {};
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div ref={componentRef} className="bg-white p-8 rounded-xl shadow-lg border">
        <div className="flex justify-between items-center mb-6">
          <img src="/logo.jpg" alt="Website Logo" className="h-12" />
          <div className="text-right">
            <h2 className="text-2xl font-bold">Invoice</h2>
            <p className="text-sm text-gray-500">{order?.createdAt}
              {/* {format(new Date(order?.createdAt), "PPP")} */}
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-2">Customer Info</h3>
          <div className="text-sm space-y-1">
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-2">Purchased Items</h3>
          <table className="table w-full text-sm">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Discount</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order?.items?.map((item, i) => {
                const subtotal = (item.price - (item.price * item.discount) / 100) * item.quantity;
                return (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>৳ {item.price}</td>
                    <td>{item.discount}%</td>
                    <td>৳ {subtotal.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 mt-6 text-sm">
          <div>
            <p><strong>Payment Status:</strong> {order?.paymentStatus}</p>
            <p><strong>Transaction ID:</strong> {payment?.transactionId}</p>
            <p><strong>Payment Method:</strong> {payment?.paymentMethod?.join(", ")}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">Total: ৳ {order?.totalAmount}</p>
            <p className="text-xs text-gray-500">
              Paid At: 
              {payment?.paidAtTime}
              {/* {format(new Date(payment?.paidAtTime), "PPPpp")} */}
            </p>
          </div>
        </div>
      </div>

      <div className="text-right mt-4">
        <button onClick={handlePrint} className="btn btn-outline btn-primary">
          Download / Print Invoice
        </button>
      </div>
    </div>
  );
};

export default Invoice;
