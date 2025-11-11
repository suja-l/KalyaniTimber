// src/Pages/CartPage/CartPage.jsx

import React, { useContext, useMemo } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, ArrowLeft } from "lucide-react";

const CartPage = () => {
  const { cartItems, removeFromCart } = useContext(StoreContext);

  // Calculate the total price using useMemo
  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  }, [cartItems]);

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-100 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-900 mb-6 flex items-center gap-3">
          <ShoppingCart size={32} />
          Your Shopping Cart
        </h1>

        {/* Check if cart is empty */}
        {cartItems.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added any products yet.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
            >
              <ArrowLeft size={18} />
              Start Shopping
            </Link>
          </div>
        ) : (
          // --- Cart Content ---
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Column 1: Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-48 sm:w-40 sm:h-auto object-cover"
                  />
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500">{item.brand}</p>
                        <h3 className="text-lg font-bold text-gray-900">
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-lg font-semibold text-amber-800">
                        ₹{item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Unit: {item.unit}
                    </p>
                    <div className="mt-auto pt-4 text-right">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-700 font-medium text-sm"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2: Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 border-b pb-3 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="font-medium">
                      ₹{totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fees</span>
                    <span className="font-medium">₹50.00</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes</span>
                    <span className="font-medium">₹{(totalPrice * 0.18).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-bold text-lg text-gray-900">
                      <span>Total Price</span>
                      <span>
                        ₹{(totalPrice + 50 + totalPrice * 0.18).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg shadow-lg transition-transform hover:scale-105">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;