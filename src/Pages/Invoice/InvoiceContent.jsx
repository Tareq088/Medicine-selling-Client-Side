// At the very first line
'use client';
import React, { forwardRef } from 'react';
const InvoiceContent = forwardRef(({ order, user, payment }, ref) => {
  
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border">
      <div className="flex justify-between items-center mb-6">
        <div className='flex gap-2 items-center'>
          <img src="/logo.jpg" alt="Website Logo" className="h-12" />
        <p className='font-extrabold text-red-700 text-2xl'>Medion</p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold">Invoice</h2>
          <p className="text-sm text-gray-500">{order?.createdAt}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-lg mb-2">Customer Info</h3>
        <div className="text-sm space-y-1">
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-lg mb-2">Purchased Items</h3>
        <table ref={ref} className="table w-full text-sm">
        {/* <table ref={ref}> */}
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
              const subtotal =
                (item.price - (item.price * item.discount) / 100) *
                item.quantity;
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

      <div className="grid grid-cols-2 mt-6 text-sm">
        <div>
          <p><strong>Payment Status:</strong> {order?.paymentStatus}</p>
          <p><strong>Transaction ID:</strong> {payment?.transactionId}</p>
          <p><strong>Payment Method:</strong> {payment?.paymentMethod?.join(", ")}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">Total: ৳ {order?.totalAmount}</p>
          <p className="text-xs text-gray-500">
            Paid At: {payment?.paidAtTime}
          </p>
        </div>
      </div>
    </div>
  );
});
InvoiceContent.displayName = "InvoiceContent";

export default InvoiceContent;
