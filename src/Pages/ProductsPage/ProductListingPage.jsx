// src/Pages/ProductsPage/ProductListingPage.jsx

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../../Components/ProductCard";
import {
  Loader,
  AlertCircle,
  Package,
  Filter,
  List,
  Search,
  Building,
} from "lucide-react";

const ProductListingPage = () => {
  const { products, isLoading, error } = useProducts();
  const [searchParams] = useSearchParams();
  const urlSearchTerm = searchParams.get("search") || "";

  // State for filters and sorting
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [searchTerm, setSearchTerm] = useState(urlSearchTerm);

  // Effect to sync URL search param to our state
  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  // Get unique categories and brands from products list
  const { categories, brands } = useMemo(() => {
    const allCategories = new Set(["All"]);
    const allBrands = new Set(["All"]);
    products.forEach((p) => {
      if (p.category) allCategories.add(p.category);
      if (p.brand) allBrands.add(p.brand);
    });
    return {
      categories: [...allCategories],
      brands: [...allBrands],
    };
  }, [products]);

  // Process products: Filter first, then sort
  const processedProducts = useMemo(() => {
    let filtered = [...products];
    const lowerCaseSearch = searchTerm.toLowerCase();

    // 1. Filter by Search Term (Name, Brand, OR Category)
    // --- THIS IS THE UPDATED LOGIC ---
    if (searchTerm) {
      filtered = filtered.filter((product) => {
        // Check name
        const nameMatch = product.name
          .toLowerCase()
          .includes(lowerCaseSearch);

        // Check brand (if it exists)
        const brandMatch = product.brand
          ? product.brand.toLowerCase().includes(lowerCaseSearch)
          : false;

        // Check category (if it exists)
        const categoryMatch = product.category
          ? product.category.toLowerCase().includes(lowerCaseSearch)
          : false;

        return nameMatch || brandMatch || categoryMatch;
      });
    }
    // --- END OF UPDATED LOGIC ---

    // 2. Filter by Category Dropdown
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // 3. Filter by Brand Dropdown
    if (selectedBrand !== "All") {
      filtered = filtered.filter(
        (product) => product.brand === selectedBrand
      );
    }

    // 4. Sort
    switch (sortOption) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, selectedCategory, selectedBrand, sortOption, searchTerm]);

  // --- Render UI ---

  // Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <Loader size={48} className="animate-spin text-amber-700" />
        <p className="ml-4 text-xl text-gray-700">Loading Products...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
        <div className="flex items-center bg-red-50 border border-red-300 rounded-lg p-6">
          <AlertCircle size={48} className="text-red-600 mr-4" />
          <div>
            <h2 className="text-xl font-bold text-red-800">
              Error Fetching Products
            </h2>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // --- Main Content (Loaded) ---
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">
            Our Timber Products
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Browse our wide selection of high-quality timber, plywood, and
            hardware for all your construction needs.
          </p>
        </div>

        {/* Filter and Sort Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 flex flex-col gap-4">
          {/* Top Row: Search */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search by name, brand, or category..." // Updated placeholder
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Bottom Row: Filters & Sort */}
          <div className="flex flex-col md:flex-row gap-4 justify-between w-full">
            {/* Category Filter */}
            <div className="flex items-center space-x-2 flex-1">
              <Filter size={18} className="text-gray-600" />
              <label
                htmlFor="category"
                className="text-sm font-medium text-gray-700"
              >
                Category:
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div className="flex items-center space-x-2 flex-1">
              <Building size={18} className="text-gray-600" />
              <label
                htmlFor="brand"
                className="text-sm font-medium text-gray-700"
              >
                Brand:
              </label>
              <select
                id="brand"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="flex items-center space-x-2 flex-1">
              <List size={18} className="text-gray-600" />
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid / Empty States */}
        {products.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-64 bg-white shadow-md rounded-lg p-6">
            <Package size={48} className="text-gray-400 mb-4" />
            <h2 className="text-xl font-bold text-gray-700">
              No Products Found
            </h2>
            <p className="text-gray-500">
              Please check back later or contact us.
            </p>
          </div>
        ) : processedProducts.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-64 bg-white shadow-md rounded-lg p-6">
            <Search size={48} className="text-gray-400 mb-4" />
            <h2 className="text-xl font-bold text-gray-700">
              No Products Match Your Filters
            </h2>
            <p className="text-gray-500">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {processedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListingPage;