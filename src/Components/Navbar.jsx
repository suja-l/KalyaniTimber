import React, { useState } from "react";
import ktm_logo from "../assets/ktmlogo.png"; // For now, we'll use a placeholder.

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-700 hover:text-amber-800 font-medium transition duration-150"
  >
    {children}
  </a>
);

export default function Navbar() {
  // State for toggling the mobile menu
  const [isOpen, setIsOpen] = useState(false);

  // State for the search bar animation
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Navigation items from the image
  const navItems = [
    { name: "Home", href: "#" },
    { name: "Products", href: "#products" },
    { name: "Services", href: "#services" },
    { name: "Contact Us", href: "#contact" },
    { name: "Admin", href: "/AdminPage" },
  ];

  return (
    // Outer container: Fixed width, sticky top, light background, shadow for lift
    <nav className="sticky top-0 z-50 bg-white shadow-md h-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* === 1. Logo and Brand Name === */}
          <div className="flex-shrink-0 flex items-center h-16">
            {/* The Logo from your image (using a K placeholder for now) */}
            <img className="w-14" src={ktm_logo} alt="Error Loading" />
            <div className="ml-3">
              <p className="text-lg font-bold text-gray-800 tracking-tight">
                KALYANI TIMBER MART
              </p>
              <p className="text-xs text-gray-500 italic mt-[-2px]">
                CRAFTED BY NATURE
              </p>
            </div>
          </div>

          {/* === 2. Desktop Navigation and Search === */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative flex items-center">
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
                ></path>
              </svg>
              <input
                type="text"
                placeholder="Search"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`
                  ml-2 p-1 text-sm outline-none border-b-2 
                  text-gray-800 transition-all duration-300 
                  ${
                    isSearchFocused
                      ? "w-48 border-amber-900"
                      : "w-24 border-transparent"
                  }
                `}
              />
            </div>
            {/* Nav Links */}
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <NavLink key={item.name} href={item.href}>
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* === 3. Mobile Menu Button (Hamburger) === */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-900"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
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
                // Icon when menu is open (X icon)
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

      {/* === 4. Mobile Menu Content === */}
      {/* Dynamic classes to show/hide the menu */}
      <div
        className={`md:hidden ${isOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-stone-100 hover:text-amber-800"
            >
              {item.name}
            </a>
          ))}
          {/* Mobile Search Box */}
          <div className="relative px-3 py-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-900"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
