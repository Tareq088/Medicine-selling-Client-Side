import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Cart = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [quantities, setQuantities] = useState({});

                    // Load cart items
  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?userEmail=${user?.email}`);
                    // Default quantity = 1 for each item
      const qtyMap = {};
      res.data.forEach(item => {qtyMap[item._id] = 1;});
      setQuantities(qtyMap);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleQuantityChange = (id, delta) => {
    setQuantities(prev => {
      const newQty = Math.max(1, (prev[id] || 1) + delta);
      return { ...prev, [id]: newQty };
    });
  };

  const removeItem = async (id) => {
    try {
      await axiosSecure.delete(`/carts/${id}`);
      toast.success("Item removed");
      queryClient.invalidateQueries(["cart", user?.email]);
    } catch (err) {
      toast.error("Failed to remove item");
      console.log(err)
    }
  };

  const clearCart = async () => {
    try {
      await axiosSecure.delete(`/carts/clear?userEmail=${user?.email}`);
      toast.success("Cart cleared");
      queryClient.invalidateQueries(["cart", user?.email]);
    } catch (err) {
      toast.error("Failed to clear cart");
      console.log(err)
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">My Cart</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Image</th>
                <th>Brand</th>
                <th>Generic</th>
                <th>Unit</th>
                <th>Price/Unit</th>
                <th>Discount</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item,index) => {
                const med = item.medicine;
                const qty = quantities[item._id] || 1;
                const price = med.price;
                const discount = med.discount;
                const discountedPrice = price - (price * discount) / 100;
                const total = (discountedPrice * qty).toFixed(2);

                return (
                  <tr key={item._id}>
                    <td>{index+1}</td>
                    <td>
                      <img src={med.image} alt={med.itemName} className="w-12 h-12 rounded" />
                    </td>
                    <td>{med.itemName}</td>
                    <td>{med.genericName || "N/A"}</td>
                    <td>{med.unit || "N/A"}</td>
                    <td>৳ {price}</td>
                    <td>{discount}%</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleQuantityChange(item._id, -1)} className="btn btn-sm btn-circle">
                          <FaMinus />
                        </button>
                        <span>{qty}</span>
                        <button onClick={() => handleQuantityChange(item._id, 1)} className="btn btn-sm btn-circle">
                          <FaPlus />
                        </button>
                      </div>
                    </td>
                    <td>৳ {total}</td>
                    <td>
                      <button onClick={() => removeItem(item._id)} className="btn btn-sm btn-error btn-circle">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-4 text-right">
            <button onClick={clearCart} className="btn btn-outline btn-error">
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
