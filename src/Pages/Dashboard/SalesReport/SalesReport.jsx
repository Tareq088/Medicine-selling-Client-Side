import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState, useRef } from "react";
import html2pdf from "html2pdf.js";

const SalesReport = () => {
  const axiosSecure = useAxiosSecure();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const reportRef = useRef();

  const { data: sales = [], refetch, isLoading } = useQuery({
    queryKey: ["salesReport", startDate, endDate],
    queryFn: async () => {
      const res = await axiosSecure.get("/sales/report", {
        params: { startDate, endDate }
      });
      return res.data;
    },
  });

  const handleFilter = () => {
    if (startDate && endDate) refetch();
  };

  const handleDownloadPDF = () => {
    const element = reportRef.current;
    console.log(reportRef)
    if (!element) return;

    const options = {
      margin: 0.5,
      filename: "sales-report.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Sales Report</h2>

      <div className="flex gap-3 mb-5">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="input input-bordered"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="input input-bordered"
        />
        <button onClick={handleFilter} className="btn btn-primary text-black">
          Filter
        </button>
        <button onClick={handleDownloadPDF} className="btn btn-secondary text-black">
          Download PDF
        </button>
      </div>

      <div ref={reportRef} className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Seller Email</th>
              <th>Buyer Email</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Price</th>
              <th>Payment Time</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="7">Loading...</td></tr>
            ) : (
              sales.map((sale, i) => (
                <tr key={i}>
                  <td>{sale.medicineName}</td>
                  <td>{sale.sellerEmail}</td>
                  <td>{sale.buyerEmail}</td>
                  <td>{sale.quantity}</td>
                  <td>৳{sale.price}</td>
                  <td>৳{sale.totalPrice}</td>
                  <td>{new Date(sale.paymentAcceptedAtTime).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesReport;
