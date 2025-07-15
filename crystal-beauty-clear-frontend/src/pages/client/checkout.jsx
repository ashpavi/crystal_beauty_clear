import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage() {
  const location = useLocation();
  const [cart, setCart] = useState(location.state?.items || []);
  const [cartRefresh, setCartRefresh] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const navigate = useNavigate();

  function placeOrder() {
    const orderData = {
      name: name,
      address: address,
      phoneNo: phoneNo,
      billItems: [],
    };
    for (let i = 0; i < cart.length; i++) {
      orderData.billItems[i] = {
        productId: cart[i].productId,
        quantity: cart[i].quantity,
      };
    }
    const token = localStorage.getItem("token");
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/order", orderData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        toast.success("Order placed successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Order placement failed");
      });
  }

  function getTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  function getTotalForLabelledPrice() {
    let total = 0;
    cart.forEach((item) => {
      total += item.labeledPrice * item.quantity;
    });
    return total;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 to-white p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-pink-500">Checkout</h1>

        {cart.map((item, index) => (
          <div key={index} className="w-full bg-gray-50 shadow-md rounded-xl p-4 mb-4 flex items-center relative">
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
              onClick={() => {
                const newCart = cart.filter((product) => product.productId !== item.productId);
                setCart(newCart);
              }}
            >
              <FaTrashAlt />
            </button>

            <img src={item.images} className="h-24 w-24 object-cover rounded-xl mr-4" />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-500">{(item.alternativeNames || []).join(" | ")}</p>
              <p className="text-sm text-gray-700">LKR: {item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center">
              <button
                className="text-xl w-8 h-8 bg-gray-800 text-white rounded-lg flex justify-center items-center mx-1"
                onClick={() => {
                  const newCart = [...cart];
                  newCart[index].quantity = Math.max(1, newCart[index].quantity - 1);
                  setCart(newCart);
                  setCartRefresh(!cartRefresh);
                }}
              >
                -
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                className="text-xl w-8 h-8 bg-gray-800 text-white rounded-lg flex justify-center items-center mx-1"
                onClick={() => {
                  const newCart = [...cart];
                  newCart[index].quantity += 1;
                  setCart(newCart);
                  setCartRefresh(!cartRefresh);
                }}
              >
                +
              </button>
            </div>
            <div className="ml-4 text-right">
              <p className="font-semibold">LKR: {(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}

        {cart.length === 0 && <div className="text-center text-lg font-semibold">Your cart is empty.</div>}

        {cart.length > 0 && (
          <>
            <div className="text-right text-lg mt-6 space-y-2">
              <div className="flex justify-end">
                <span className="w-32 text-gray-700 font-semibold">Total:</span>
                <span className="w-32 text-right">LKR: {getTotalForLabelledPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-end">
                <span className="w-32 text-gray-700 font-semibold">Discount:</span>
                <span className="w-32 text-right text-green-600">LKR: {(getTotalForLabelledPrice() - getTotal()).toFixed(2)}</span>
              </div>
              <div className="flex justify-end border-t-2 pt-2">
                <span className="w-32 text-gray-900 font-bold">Net Total:</span>
                <span className="w-32 text-right font-bold">LKR: {getTotal().toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-1 text-gray-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-1 text-gray-700">Phone Number</label>
                <input
                  type="text"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  placeholder="e.g. 0771234567"
                  className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-1 text-gray-700">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Your delivery address"
                  className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div className="text-right">
                <button
                  onClick={placeOrder}
                  className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-6 py-3 rounded-lg font-semibold shadow-lg"
                >
                  Place Order
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
