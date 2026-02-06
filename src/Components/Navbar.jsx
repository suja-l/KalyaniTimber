// src/Components/Navbar.jsx

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext"; 
import ktm_logo from "../assets/ktmlogo.png";

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

  // Hook into Global Context for cart, favorites, and user session
  const { cartItems, favorites, user, logout } = useContext(StoreContext);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    {
      name: "Favorites",
      href: "/favorites",
      badgeCount: favorites.length,
    },
    {
      name: "Cart",
      href: "/cart",
      badgeCount: cartItems.length,
    },
  ];

  // Only show Admin link if the logged-in user is an admin
  if (user && user.role === "admin") {
    navItems.push({ name: "Admin", href: "/admin" });
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setIsOpen(false);
      setIsSearchFocused(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-[1000] bg-white shadow-md h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="shrink-0 flex items-center h-16 cursor-pointer" onClick={() => navigate("/")}>
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
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`ml-2 p-1 text-sm outline-none border-b-2 text-gray-800 transition-all duration-300 ${
                  isSearchFocused ? "w-48 border-amber-900" : "w-24 border-transparent"
                }`}
              />
            </form>

            <div className="flex space-x-6 items-center">
              {navItems.map((item) => (
                <NavLink key={item.name} href={item.href} badgeCount={item.badgeCount}>
                  {item.name}
                </NavLink>
              ))}

              {/* AUTHENTICATION UI */}
              {user ? (
                <div className="flex items-center space-x-4 ml-4 border-l pl-4 border-gray-200">
                  <span className="text-sm font-semibold text-amber-900">Hi, {user.name}</span>
                  <button 
                    onClick={handleLogout}
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="ml-4 px-4 py-1.5 rounded-md bg-amber-800 text-white text-sm font-medium hover:bg-amber-900 transition"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} bg-white border-b shadow-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-stone-100"
            >
              {item.name} {item.badgeCount > 0 && `(${item.badgeCount})`}
            </Link>
          ))}
          
          <div className="pt-4 border-t border-gray-100">
            {user ? (
              <div className="px-3 py-2">
                <p className="text-sm font-bold text-amber-900">Signed in as {user.name}</p>
                <button onClick={handleLogout} className="mt-2 text-red-600 font-medium">Logout</button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-amber-800"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}