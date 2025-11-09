import React, { useState, useEffect } from "react";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NavItem = ({ icon: Icon, title, link, active, onClick }) => (
  <Link
    to={link}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      active
        ? "bg-amber-700 text-white"
        : "text-amber-100 hover:bg-amber-800 hover:text-white"
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{title}</span>
  </Link>
);

const AdminSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const closeSidebar = () => setSidebarOpen(false);

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    if (sidebarOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [sidebarOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 flex items-center justify-between bg-amber-900 text-white p-4 z-30">
        <h2 className="text-lg font-semibold">Timber Admin</h2>
        <button 
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={sidebarOpen}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-amber-900 text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 transition-transform duration-300 flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-amber-800">
          <h2 className="text-xl font-bold">Timber Admin</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden hover:bg-amber-800 p-2 rounded"
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavItem
            icon={Home}
            title="Dashboard"
            link="/admin"
            active={location.pathname === "/admin"}
            onClick={closeSidebar}
          />
          <NavItem
            icon={Package}
            title="Products"
            link="/admin/products"
            active={location.pathname.startsWith("/admin/products")}
            onClick={closeSidebar}
          />
          <NavItem
            icon={ShoppingCart}
            title="Orders"
            link="/admin/orders"
            active={location.pathname.startsWith("/admin/orders")}
            onClick={closeSidebar}
          />
          <NavItem
            icon={Users}
            title="Customers"
            link="/admin/customers"
            active={location.pathname.startsWith("/admin/customers")}
            onClick={closeSidebar}
          />
          <NavItem
            icon={BarChart3}
            title="Analytics"
            link="/admin/analytics"
            active={location.pathname.startsWith("/admin/analytics")}
            onClick={closeSidebar}
          />
          <NavItem
            icon={Settings}
            title="Settings"
            link="/admin/settings"
            active={location.pathname.startsWith("/admin/settings")}
            onClick={closeSidebar}
          />
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-amber-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-amber-800 rounded-lg transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;