// src/Components/Navbar.jsx

import React, { useState, useContext } from "react"; // <-- 1. IMPORT useContext
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext"; // <-- 2. IMPORT StoreContext
import ktm_logo from "../assets/ktmlogo.png";

// --- 3. UPDATED NavLink to handle context ---
const NavLink = ({ href, children, badgeCount }) => (
  <Link
    to={href}
    className="relative text-gray-700 hover:text-amber-800 font-medium transition duration-150"
  >
    {children}
    {badgeCount > 0 && (
      <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
        {badgeCount}
      </span>
    )}
  </Link>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // --- 4. HOOK INTO THE GLOBAL CONTEXT ---
  const { cartItems, favorites } = useContext(StoreContext);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    // --- 5. UPDATED navItems to show counts ---
    {
      name: "Favorites",
      href: "/favorites", // (This page doesn't exist yet)
      badgeCount: favorites.length,
    },
    {
      name: "Cart",
      href: "/cart", // (This page doesn't exist yet)
      badgeCount: cartItems.length,
    },
    { name: "Admin", href: "/admin" },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setIsOpen(false);
      setIsSearchFocused(false);
    }
  };

  return (
    <nav className="sticky top-0 z-1000 bg-white shadow-md h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="shrink-0 flex items-center h-16">
            <img className="w-14" src={ktm_logo} alt="Kalyani Timber" />
            <div className="ml-3">
              <p className="text-lg font-bold text-gray-800 tracking-tight">
                KALYANI TIMBER MART
              </p>
              <p className="text-xs text-gray-500 italic -mt-0.5">
                CRAFTED BY NATURE
              </p>
            </div>
          </div>

          {/* Desktop nav + search */}
          <div className="hidden md:flex items-center space-x-8">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center"
            >
              <svg
                className={`w-5 h-5 transition-colors ${
                  isSearchFocused ? "text-amber-900" : "text-gray-400"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`ml-2 p-1 text-sm outline-none border-b-2 text-gray-800 transition-all duration-300 ${
                  isSearchFocused
                    ? "w-48 border-amber-900"
                    : "w-24 border-transparent"
                }`}
              />
            </form>

            <div className="flex space-x-6">
              {/* --- 6. UPDATED NavLink rendering --- */}
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  href={item.href}
                  badgeCount={item.badgeCount}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-900"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${isOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* --- 7. UPDATED Mobile NavLink rendering --- */}
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className="relative block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-stone-100 hover:text-amber-800"
            >
              {item.name}
              {item.badgeCount > 0 && (
                <span className="absolute left-1/2 -top-0 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {item.badgeCount}
                </span>
              )}
            </Link>
          ))}
          <form
            onSubmit={handleSearchSubmit}
            className="relative px-3 py-2"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-900"
            />
          </form>
        </div>
      </div>
    </nav>
  );
}