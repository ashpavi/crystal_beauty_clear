import { useState, Fragment } from "react";
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

  const formatLKR = (n) => (Number(n) || 0).toFixed(2);
  const hasItems = cart.length > 0;

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
      total += (item.labeledPrice ?? item.price) * item.quantity;
    });
    return total;
  }

  function placeOrder() {
    if (!hasItems) {
      toast.error("Your cart is empty.");
      return;
    }
    if (!name.trim() || !phoneNo.trim() || !address.trim()) {
      toast.error("Please fill name, phone, and address.");
      return;
    }

    const orderData = {
      name: name.trim(),
      address: address.trim(),
      phoneNo: phoneNo.trim(),
      billItems: cart.map((c) => ({ productId: c.productId, quantity: c.quantity })),
    };

    const token = localStorage.getItem("token");
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/order", orderData, {
        headers: { Authorization: "Bearer " + token },
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

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center p-4 lg:p-6">
      <div className="w-full max-w-3xl bg-white p-4 lg:p-6 rounded-xl shadow-2xl">
        <h1 className="text-2xl lg:text-3xl font-bold text-center mb-4 lg:mb-6 text-pink-500">Checkout</h1>

        {cart.map((item, index) => (
          <div
            key={index}
            className="relative w-full bg-gray-50 shadow-md rounded-xl p-4 mb-4 flex flex-col gap-3 lg:flex-row lg:items-center"
          >
            {/* Remove button: inside on mobile, same position on lg */}
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
              onClick={() => {
                const newCart = cart.filter((product) => product.productId !== item.productId);
                setCart(newCart);
              }}
              aria-label="Remove item"
            >
              <FaTrashAlt />
            </button>

            <img
              src={item.images}
              alt={item.name}
              className="w-full h-40 object-cover rounded-xl lg:h-24 lg:w-24 lg:mr-4"
            />

            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-500">{(item.alternativeNames || []).join(" | ")}</p>
              <p className="text-sm text-gray-700">LKR: {formatLKR(item.price)}</p>
            </div>

            <div className="flex items-center">
              <button
                className="text-xl w-10 h-10 bg-gray-900 text-white rounded-lg flex justify-center items-center mx-1"
                onClick={() => {
                  const newCart = [...cart];
                  newCart[index].quantity = Math.max(1, newCart[index].quantity - 1);
                  setCart(newCart);
                  setCartRefresh(!cartRefresh);
                }}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-10 text-center text-base">{item.quantity}</span>
              <button
                className="text-xl w-10 h-10 bg-gray-900 text-white rounded-lg flex justify-center items-center mx-1"
                onClick={() => {
                  const newCart = [...cart];
                  newCart[index].quantity += 1;
                  setCart(newCart);
                  setCartRefresh(!cartRefresh);
                }}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <div className="lg:ml-4 text-left lg:text-right">
              <p className="font-semibold">LKR: {formatLKR(item.price * item.quantity)}</p>
            </div>
          </div>
        ))}

        {!hasItems && (
          <div className="text-center text-lg font-semibold py-10">Your cart is empty.</div>
        )}

        {hasItems && (
          <Fragment>
            {/* Totals — desktop original alignment kept with lg overrides */}
            <div className="hidden lg:block text-right text-lg mt-6 space-y-2">
              <div className="flex justify-end">
                <span className="w-32 text-gray-700 font-semibold">Total:</span>
                <span className="w-32 text-right">LKR: {formatLKR(getTotalForLabelledPrice())}</span>
              </div>
              <div className="flex justify-end">
                <span className="w-32 text-gray-700 font-semibold">Discount:</span>
                <span className="w-32 text-right text-green-600">LKR: {formatLKR(getTotalForLabelledPrice() - getTotal())}</span>
              </div>
              <div className="flex justify-end border-t-2 pt-2">
                <span className="w-32 text-gray-900 font-bold">Net Total:</span>
                <span className="w-32 text-right font-bold">LKR: {formatLKR(getTotal())}</span>
              </div>
            </div>

            {/* Form */}
            <div className="mt-6 space-y-4">
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
                  type="tel"
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

              {/* Desktop place order button (kept inline) */}
              <div className="hidden lg:flex justify-end pt-2">
                <button
                  onClick={placeOrder}
                  className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-6 py-3 rounded-lg font-semibold shadow-lg"
                >
                  Place Order
                </button>
              </div>
            </div>

            {/* Spacer for mobile sticky bar */}
            <div className="lg:hidden h-24" />
          </Fragment>
        )}
      </div>

      {/* Mobile sticky summary bar */}
      {hasItems && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-20 bg-white border-t shadow-[0_-6px_16px_rgba(0,0,0,0.06)]">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-end justify-between">
            <div>
              <div className="text-xs text-gray-500">Net Total</div>
              <div className="text-xl font-bold">LKR {formatLKR(getTotal())}</div>
              <div className="text-[11px] text-gray-500">(Saved LKR {formatLKR(getTotalForLabelledPrice() - getTotal())})</div>
            </div>
            <button
              onClick={placeOrder}
              className="h-11 px-5 rounded-lg bg-pink-500 text-white font-semibold shadow-md active:scale-[0.99]"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
