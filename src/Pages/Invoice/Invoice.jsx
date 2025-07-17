
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import InvoiceContent from "./InvoiceContent";
import Loading from './../../Components/Loading/Loading';
import { useReactToPrint } from "react-to-print";
import {useRef } from "react";


const Invoice = () => {
  const { OrderID } = useParams(); // OrderID
  const axiosSecure = useAxiosSecure();
  const componentRef = useRef();

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


   // ✅ Print handler using react-to-print
  const handlePrint = useReactToPrint({
  contentRef: componentRef,
  documentTitle: 'Medion Invoice',
  });

  if (isLoading || !orderData) return <Loading></Loading>;

  const { order, user, payment } = orderData || {};
  return (
    <div className="p-6 max-w-4xl mx-auto">
    <InvoiceContent ref={componentRef} order={order} user={user} payment={payment} />

      {/* { componentRef.current &&
          <> */}
          <button onClick={handlePrint} className="btn btn-primary text-black block mx-auto my-5">
            Print Invoice
          </button>
          {/* </>  
      }   */}
    </div>
  );
};

export default Invoice;
