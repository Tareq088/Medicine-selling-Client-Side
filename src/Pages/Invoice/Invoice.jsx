import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import InvoiceContent from "./InvoiceContent";
import { useRef } from 'react';
import Loading from './../../Components/Loading/Loading';
import html2pdf from 'html2pdf.js/dist/html2pdf.bundle.min';



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
// console.log("Ref before print:", componentRef);

const handleDownloadPdf = () => {
  if (!componentRef.current) return;

  const options = {
    margin: 0.5,
    filename: `Invoice-${OrderID}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
  };

  // Optional: Scroll to top before generating
  window.scrollTo(0, 0);
  html2pdf().set(options).from(componentRef.current).save();
};


if (isLoading || !orderData) return <Loading></Loading>;


// console.log("Ref after loading:", componentRef.current);
  const { order, user, payment } = orderData || {};
  return (
    <div className="p-6 max-w-4xl mx-auto">
    <InvoiceContent ref={componentRef} order={order} user={user} payment={payment} />

      <div className="text-right mt-4">
        <button onClick={handleDownloadPdf} className="btn btn-outline btn-primary">
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Invoice;
