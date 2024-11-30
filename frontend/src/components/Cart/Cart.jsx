import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";

export default function Cart({ showModal, toggle }) {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    remove,
  } = useContext(CartContext);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isCheckout, setIsCheckout] = useState(false);

  const handleCheckout = () => {
    if (!address || !city || !postalCode) {
      alert("Please fill in all address fields.");
      return;
    }

    // Here you can handle the order submission (e.g., send to backend)
    alert(
      `Order placed! Total: $${getCartTotal()}. Address: ${address}, ${city}, ${postalCode}`
    );

    // Clear cart after order
    clearCart();
    toggle(); // Close the cart modal
  };

  return (
    showModal && (
      <div className="fixed inset-0 flex items-start justify-end z-50 mt-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Cart</h1>
            <button
              className="px-3 py-1 bg-black text-white text-xs font-bold rounded hover:bg-red-500 transition duration-200"
              onClick={toggle}
            >
              Close
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  className="flex justify-between items-center border-b border-gray-300 pb-4"
                  key={item._id} // Updated key to use item._id
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="rounded-md h-20 w-20 object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="text-lg font-semibold">{item.title}</h1>
                      <h2 className="text-sm text-gray-500">
                        Size: {item.size}
                      </h2>
                      <h2 className="text-sm text-gray-500">
                        Color: {item.color}
                      </h2>
                      <p className="text-lg font-bold text-gray-800">
                        ${item.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 py-1 bg-gray-800 text-white text-xs font-bold rounded hover:bg-gray-700 transition duration-200"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-800 text-white text-xs font-bold rounded hover:bg-gray-700 transition duration-200"
                      onClick={() => removeFromCart(item)}
                    >
                      -
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase rounded hover:bg-red-500 focus:outline-none focus:bg-red-500"
                      onClick={() => remove(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-lg font-bold text-center">Cart is empty</h1>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="flex flex-col justify-center items-center mt-4">
              <h1 className="text-lg font-bold">Total: ${getCartTotal()}</h1>
              <button
                className="mt-2 px-4 py-2 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-500 transition duration-200"
                onClick={clearCart}
              >
                Clear cart
              </button>
            </div>
          )}

          {/* Checkout Form */}
          {cartItems.length > 0 && !isCheckout && (
            <div className="mt-6">
              <h2 className="text-lg font-bold mb-2">Checkout</h2>
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCheckout();
                }}
              >
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 bg-black text-white text-xs font-bold rounded hover:bg-slate-900 transition duration-200"
                >
                  Cash on Delivery
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    )
  );
}

Cart.propTypes = {
  showModal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};
