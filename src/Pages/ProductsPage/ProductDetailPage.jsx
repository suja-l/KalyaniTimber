// src/Pages/ProductsPage/ProductDetailPage.jsx

import React, { useContext } from "react"; // <-- 1. IMPORT useContext
import { useParams, Link } from "react-router-dom";
import { useProductById } from "../../hooks/useProductById";
import { StoreContext } from "../../context/StoreContext"; // <-- 2. IMPORT StoreContext
import {
  Loader,
  AlertCircle,
  ShoppingCart,
  Zap,
  Tag,
  Truck,
  Shield,
  Star,
  ChevronLeft,
  Heart, // <-- 3. IMPORT Heart ICON
} from "lucide-react";

// A small component for specification rows
const SpecRow = ({ label, value }) => {
  if (!value) return null; // Don't render if value is empty
  return (
    <div className="flex border-b border-gray-200 py-3">
      <span className="w-1/3 text-sm font-medium text-gray-500">
        {label}
      </span>
      <span className="w-2/3 text-sm text-gray-900">{value}</span>
    </div>
  );
};

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { product, isLoading, error } = useProductById(productId);

  // --- 4. HOOK INTO THE GLOBAL CONTEXT ---
  const { addToCart, toggleFavorite, favorites } = useContext(StoreContext);

  // Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Loader size={48} className="animate-spin text-amber-700" />
      </div>
    );
  }

  // Error State
  if (error) {
    // (Error handling markup... no changes)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
        <div className="flex items-center bg-red-50 border border-red-300 rounded-lg p-6">
          <AlertCircle size={48} className="text-red-600 mr-4" />
          <div>
            <h2 className="text-xl font-bold text-red-800">
              Error Fetching Product
            </h2>
            <p className="text-red-700">{error}</p>
            <Link
              to="/products"
              className="mt-4 inline-flex items-center text-blue-600 hover:underline"
            >
              <ChevronLeft size={18} />
              Back to all products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!product) {
    // (Not found markup... no changes)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
        <h2 className="text-2xl font-bold text-gray-700">
          Product not found.
        </h2>
        <Link
          to="/products"
          className="ml-4 inline-flex items-center text-blue-600 hover:underline"
        >
          <ChevronLeft size={18} />
          Back to all products
        </Link>
      </div>
    );
  }
  
  // --- 5. CHECK IF THIS PRODUCT IS A FAVORITE ---
  const isFavorite = favorites.some((item) => item._id === product._id);

  // --- Main Content (Product Loaded) ---
  return (
    <div className="bg-white min-h-screen pb-24 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back link */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 font-medium mb-6"
        >
          <ChevronLeft size={20} />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Column 1: Image & Actions */}
          <div className="md:sticky md:top-24 md:self-start">
            <div className="relative bg-gray-100 rounded-lg shadow-md overflow-hidden p-4">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto object-cover rounded-lg aspect-square"
              />
              {/* --- 6. ADDED FAVORITE BUTTON --- */}
              <button
                onClick={() => toggleFavorite(product)}
                className={`absolute top-4 right-4 p-2 bg-white rounded-full shadow-md transition-colors ${
                  isFavorite ? "text-red-500" : "text-gray-500"
                } hover:text-red-500`}
                aria-label="Toggle Favorite"
              >
                <Heart
                  size={24}
                  fill={isFavorite ? "currentColor" : "none"}
                />
              </button>
            </div>
            {/* Action Buttons */}
            <div className="mt-6 hidden md:grid grid-cols-2 gap-4">
              {/* --- 7. ADDED onClick HANDLER --- */}
              <button
                onClick={() => addToCart(product)}
                className="flex items-center justify-center gap-2 w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform hover:scale-105"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button className="flex items-center justify-center gap-2 w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform hover:scale-105">
                <Zap size={20} />
                Buy Now
              </button>
            </div>
          </div>

          {/* Column 2: Details */}
          <div>
            {/* (Brand, Name, Price, Offers... no changes here) */}
            {product.brand && (
              <p className="text-lg font-semibold text-amber-700">
                {product.brand}
              </p>
            )}
            <h1 className="text-3xl font-bold text-gray-900 mt-1">
              {product.name}
            </h1>
            <div className="flex items-center gap-6 mt-4">
              <p className="text-4xl font-extrabold text-gray-900">
                ₹{product.price.toFixed(2)}
                <span className="text-lg font-normal text-gray-500">
                  {" "}
                  / {product.unit}
                </span>
              </p>
              <span className="inline-flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-full font-semibold">
                4.5 <Star size={16} fill="white" />
              </span>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Tag size={18} className="text-green-600" />
                <span className="font-semibold">Special Price:</span>
                <span className="text-gray-700">
                  Get extra 10% off (price inclusive of discount)
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Tag size={18} className="text-green-600" />
                <span className="font-semibold">Bank Offer:</span>
                <span className="text-gray-700">
                  5% off on HDFC Bank Credit Card
                </span>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div className="flex items-center gap-2 text-sm">
                <Truck size={20} className="text-gray-600" />
                <span className="text-gray-700">Standard Delivery by 2 Days</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield size={20} className="text-gray-600" />
                <span className="text-gray-700">1 Year Warranty</span>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Specifications
              </h2>
              <div className="border-t border-gray-300">
                <SpecRow label="Brand" value={product.brand} />
                <SpecRow label="Category" value={product.category} />
                <SpecRow label="Grade" value={product.specs?.grade} />
                <SpecRow label="Origin" value={product.specs?.origin} />
                <SpecRow label="Density" value={product.specs?.density} />
                <SpecRow label="Tags" value={product.tags?.join(", ")} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- 8. ADDED onClick HANDLER TO MOBILE BUTTONS --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-10 bg-white p-3 border-t border-gray-200 shadow-inner grid grid-cols-2 gap-3">
        <button
          onClick={() => addToCart(product)}
          className="flex items-center justify-center gap-2 w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </button>
        <button className="flex items-center justify-center gap-2 w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 px-4 rounded-lg shadow-lg">
          <Zap size={20} />
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;