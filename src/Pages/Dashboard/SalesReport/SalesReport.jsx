import { useQuery } from "@tanstack/react-query";

import { useState,} from "react";

import useAxiosSecure from './../../../Hooks/useAxiosSecure';
import { usePDF } from 'react-to-pdf';
import { ReTitle } from "re-title";

const SalesReport = () => {
  const axiosSecure = useAxiosSecure();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});

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

  return (
    <div className="p-5">
      <ReTitle title='Medion|Sales Report'/>
      <h2 className="text-4xl font-bold mb-4 text-center text-blue-600">Sales Report</h2>

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

     <button className="btn btn-primary text-black" onClick={() => toPDF()}>Download PDF</button>
      </div>

      <div ref={targetRef} className="overflow-x-auto bg-white p-4" style={{ backgroundColor: '#ffffff', color: '#000000' }}  >
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
