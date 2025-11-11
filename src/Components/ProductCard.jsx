// src/Components/ProductCard.jsx

import React, { useContext } from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const ProductCard = ({ product }) => {
  const productUrl = `/products/${product._id}`;

  const { addToCart } = useContext(StoreContext);

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      {/* Image Container - NOW A LINK */}
      <Link to={productUrl} className="relative h-48 w-full overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {product.category}
        </div>
      </Link>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-amber-900 mb-1">
          {product.name}
        </h3>
        <p className="text-lg font-semibold text-gray-700 mb-2">
          ₹{product.price.toFixed(2)}
          <span className="text-sm font-normal text-gray-500">
            {" "}
            / {product.unit}
          </span>
        </p>
        <p className="text-sm text-gray-600 flex-1 mb-4">
          {product.description.substring(0, 100)}
          {product.description.length > 100 ? "..." : ""}
        </p> {/* <-- THIS IS THE FIX */}

        {/* Buttons */}
        <div className="mt-auto space-y-2">
          {/* --- 4. ADDED onClick HANDLER TO THIS BUTTON --- */}
          <button
            onClick={() => addToCart(product)}
            className="w-full group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md bg-amber-600 px-4 py-2.5 text-white font-semibold shadow-md transition-all duration-300 ease-out hover:bg-amber-700"
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </button>

          {/* View Details Button - NOW A LINK */}
          <Link
            to={productUrl}
            className="w-full group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md border border-amber-600 px-4 py-2.5 text-amber-700 font-semibold transition-all duration-300 ease-out hover:bg-amber-50"
          >
            <span>View Details</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;