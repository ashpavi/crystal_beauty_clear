import { useEffect, useState, Fragment } from "react";
import getCart, { addToCart, getTotal, getTotalForLabelledPrice, removeFromCart } from "../../utils/cart";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cartLoaded, setCartLoaded] = useState(false);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartLoaded === false) {
      const c = getCart();
      setCart(c);
      setCartLoaded(true);
    }
  }, [cartLoaded]);

  const formatLKR = (n) => (Number(n) || 0).toFixed(2);
  const hasItems = cart && cart.length > 0;

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center p-4 lg:p-[40px]">
      <div className="w-full max-w-[700px]">
        {cart.map((item, index) => {
          const key = item?.productId ?? index;
          const altNames = Array.isArray(item?.alternativeNames)
            ? item.alternativeNames.join(" | ")
            : "";

          return (
            <div
              key={key}
              className="relative w-full bg-white shadow-md my-2 rounded-xl flex flex-col gap-3 p-4 lg:px-5 lg:py-3 lg:my-[5px] lg:rounded-lg lg:flex-row lg:items-center lg:justify-between lg:h-[100px]"
            >
              {/* Delete button: inside card on mobile, floats outside on lg to match original */}
              <button
                aria-label="Remove from cart"
                className="absolute top-2 right-2 grid place-items-center w-9 h-9 rounded-full bg-red-500 text-white shadow-sm lg:top-1/2 lg:-right-[50px] lg:-translate-y-1/2"
                onClick={() => {
                  removeFromCart(item.productId);
                  setCartLoaded(false);
                }}
              >
                <FaTrashAlt className="text-sm" />
              </button>

              {/* Image */}
              <img
                src={item.images}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg lg:h-full lg:w-auto lg:py-[5px] lg:aspect-square"
              />

              {/* Details */}
              <div className="flex-1 overflow-hidden flex flex-col justify-center lg:max-w-[300px] lg:w-[300px]">
                <h1 className="text-lg lg:text-[20px] font-bold truncate" title={item.name}>
                  {item.name}
                </h1>
                {altNames && (
                  <h2 className="text-[14px] lg:text-[16px] font-semibold text-gray-500 line-clamp-2 lg:whitespace-nowrap lg:text-ellipsis lg:overflow-hidden">
                    {altNames}
                  </h2>
                )}
                <h2 className="text-[15px] lg:text-[16px] font-semibold text-gray-700 mt-1">
                  LKR: {formatLKR(item.price)}
                </h2>
              </div>

              {/* Quantity controls */}
              <div className="w-full flex items-center justify-between lg:w-[100px] lg:justify-center">
                <button
                  aria-label="Decrease quantity"
                  className="text-2xl w-10 h-10 bg-black text-white rounded-lg flex justify-center items-center pb-1 cursor-pointer lg:text-3xl lg:w-[25px] lg:h-[25px] lg:mx-[7px]"
                  onClick={() => {
                    addToCart(item, -1);
                    setCartLoaded(false);
                  }}
                >
                  -
                </button>
                <span className="text-base lg:text-[16px] font-semibold text-gray-700">
                  {item.quantity}
                </span>
                <button
                  aria-label="Increase quantity"
                  className="text-2xl w-10 h-10 bg-black text-white rounded-lg flex justify-center items-center pb-1 cursor-pointer lg:text-3xl lg:w-[25px] lg:h-[25px] lg:mx-[7px]"
                  onClick={() => {
                    addToCart(item, 1);
                    setCartLoaded(false);
                  }}
                >
                  +
                </button>
              </div>

              {/* Line total */}
              <div className="w-full flex items-center justify-between lg:w-[100px] lg:justify-center">
                <h2 className="text-[15px] lg:text-[16px] font-semibold text-gray-700">
                  LKR: {formatLKR(item.price * item.quantity)}
                </h2>
              </div>
            </div>
          );
        })}

        {!hasItems && (
          <div className="mt-10 bg-white shadow-sm rounded-xl p-6 text-center">
            <p className="text-lg font-semibold text-gray-700">Your cart is empty.</p>
            <button
              className="mt-4 inline-flex items-center justify-center px-5 h-11 text-[15px] font-semibold bg-black text-white rounded-lg"
              onClick={() => navigate("/", { replace: false })}
            >
              Continue Shopping
            </button>
          </div>
        )}

        {/* Desktop totals — original layout preserved */}
        {hasItems && (
          <Fragment>
            <div className="hidden lg:flex w-full justify-end mt-4">
              <h1 className="w-[100px] text-[16px] font-semibold text-end pr-2">Total :</h1>
              <h1 className="w-[100px] text-[16px] font-semibold text-end pr-2">{formatLKR(getTotalForLabelledPrice())}</h1>
            </div>
            <div className="hidden lg:flex w-full justify-end">
              <h1 className="w-[100px] text-[16px] font-semibold text-end pr-2">Discount :</h1>
              <h1 className="w-[100px] text-[16px] font-semibold text-end border-b-[2px] pr-2">
                {formatLKR(getTotalForLabelledPrice() - getTotal())}
              </h1>
            </div>
            <div className="hidden lg:flex w-full justify-end">
              <h1 className="w-[100px] text-[16px] font-semibold text-end pr-2">Net Total :</h1>
              <h1 className="w-[100px] text-[16px] font-semibold text-end border-b-[4px] border-double pr-2">
                {formatLKR(getTotal())}
              </h1>
            </div>
            <div className="hidden lg:flex w-full justify-end mt-4">
              <button
                className="w-[170px] h-[40px] text-[18px] font-semibold text-center shadow-2xl bg-pink-400 text-white pr-2 rounded-lg cursor-pointer"
                onClick={() => {
                  navigate("/checkout", {
                    state: { items: cart },
                  });
                }}
              >
                Checkout
              </button>
            </div>
          </Fragment>
        )}

        {/* Spacer for mobile sticky bar */}
        {hasItems && <div className="lg:hidden h-24" />}
      </div>

      {/* Mobile sticky summary (hidden on lg) */}
      {hasItems && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-20 bg-white border-t shadow-[0_-6px_16px_rgba(0,0,0,0.06)]">
          <div className="max-w-[700px] mx-auto px-4 py-3">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs text-gray-500">Net Total</div>
                <div className="text-xl font-bold">LKR {formatLKR(getTotal())}</div>
                <div className="text-[11px] text-gray-500">
                  (Saved LKR {formatLKR(getTotalForLabelledPrice() - getTotal())})
                </div>
              </div>
              <button
                className="h-11 px-5 rounded-lg bg-pink-500 text-white font-semibold shadow-md active:scale-[0.99]"
                onClick={() => {
                  navigate("/checkout", {
                    state: { items: cart },
                  });
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
