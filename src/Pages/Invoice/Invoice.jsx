
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import InvoiceContent from "./InvoiceContent";
import Loading from './../../Components/Loading/Loading';
import { usePDF } from 'react-to-pdf';
// import { useRef } from "react";


const Invoice = () => {
  const { OrderID } = useParams(); // OrderID
  const axiosSecure = useAxiosSecure();
  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
  // const componentRef = useRef();
  
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

if (isLoading || !orderData) return <Loading></Loading>;

  const { order, user, payment } = orderData || {};
  return (
    <div className="p-6 max-w-4xl mx-auto">
    <InvoiceContent ref={targetRef} order={order} user={user} payment={payment} />

      <button onClick={() => toPDF()}>Download PDF</button> 
      {/* <ReactToPdf targetRef={componentRef} filename="invoice.pdf" options={{ orientation: 'portrait' }}>
          {({ toPdf }) => (
            <button className="btn btn-outline btn-primary" onClick={toPdf}>
              Download PDF
            </button>
          )}
        </ReactToPdf> */}
    </div>
  );
};

export default Invoice;
