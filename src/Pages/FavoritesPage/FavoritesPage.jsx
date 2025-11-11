// src/Pages/FavoritesPage/FavoritesPage.jsx

import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import ProductCard from "../../Components/ProductCard"; // Re-using this!
import { Link } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";

const FavoritesPage = () => {
  const { favorites } = useContext(StoreContext);

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-100 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-900 mb-6 flex items-center gap-3">
          <Heart size={32} />
          Your Favorites
        </h1>

        {/* Check if favorites is empty */}
        {favorites.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              You haven't saved any items yet
            </h2>
            <p className="text-gray-500 mb-6">
              Click the heart icon on a product to save it here.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
            >
              <ArrowLeft size={18} />
              Find Products
            </Link>
          </div>
        ) : (
          // --- Favorites Grid ---
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favorites.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;