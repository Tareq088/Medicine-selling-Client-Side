import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Loading from "../../Components/Loading/Loading";

const Cart = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 🔁 Load Cart Items
  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?userEmail=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // 🔼🔽 Update Quantity Mutation
  const quantityMutation = useMutation({
    mutationFn: async ({ id, delta }) => {
      const res = await axiosSecure.patch(`/carts/${id}/quantity?delta=${delta}`);
      return res.data;
    },
    onSuccess: () => {
      // toast.success("Quantity updated");
      queryClient.invalidateQueries(["cart", user?.email]);
    },
    onError: err => {
      toast.error(err.response?.data?.message || "Failed to update quantity");
    }
  });

  const handleQuantityChange = (id, delta) => {
    quantityMutation.mutate({ id, delta });
  };

  // ❌ Remove Single Item Mutation
  const removeMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/carts/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Item removed");
      queryClient.invalidateQueries(["cart", user?.email]);
    },
    onError: () => {
      toast.error("Failed to remove item");
    }
  });

  const handleRemoveItem = (id) => {
    removeMutation.mutate(id);
  };

  // 🧹 Clear All Cart Items
  const clearMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.delete(`/carts/all/clear?userEmail=${user?.email}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Cart cleared");
      queryClient.invalidateQueries(["cart", user?.email]);
    },
    onError: () => {
      toast.error("Failed to clear cart");
    }
  });

  const handleClearCart = () => {
    clearMutation.mutate();
  };

  const getTotal = () =>
    cartItems.reduce((sum, item) => {
      const { price, discount } = item.medicine;
      const discounted = price - (price * discount) / 100;
      return sum + discounted * item.quantity;
    }, 0).toFixed(2);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">My Cart</h2>

      {isLoading ? (
        <Loading></Loading>
      ) : cartItems.length === 0 ? (
        <p className="text-center text-2xl">Your cart is empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Generic</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Qty</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item,index) => {
                const { _id, quantity, medicine } = item;
                const { image, itemName, genericName, unit, price, discount } = medicine;
                const discounted = price - (price * discount) / 100;
                const rowTotal = (discounted * quantity).toFixed(2);

                return (
                  <tr key={_id}>
                    <td>{index+1}</td>
                    <td>
                      <img src={image} alt={itemName} className="w-12 h-12 rounded" />
                    </td>
                    <td>{itemName}</td>
                    <td>{genericName || "N/A"}</td>
                    <td>{unit || "N/A"}</td>
                    <td>৳ {price}</td>
                    <td>{discount}%</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(_id, -1)}
                          className="btn btn-sm btn-circle"
                          disabled={quantityMutation.isPending}
                        >
                          <FaMinus />
                        </button>
                        <span>{quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(_id, 1)}
                          className="btn btn-sm btn-circle"
                          disabled={quantityMutation.isPending}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </td>
                    <td>৳ {rowTotal}</td>
                    <td>
                      <button
                        onClick={() => handleRemoveItem(_id)}
                        className="btn btn-sm btn-error btn-circle"
                        disabled={removeMutation.isPending}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <p className="text-xl font-semibold">Total: ৳ {getTotal()}</p>
            <button
              onClick={handleClearCart}
              className="btn btn-outline btn-error"
              disabled={clearMutation.isPending}
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
