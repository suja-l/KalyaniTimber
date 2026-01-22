import React, { useState, useEffect } from "react";
import { 
  Search, 
  Plus, 
  Filter, 
  AlertTriangle, 
  ArrowUpDown,
  MoreVertical,
  Download,
  X
} from "lucide-react";
import AdminSidebar from "../../Components/AdminSideNavbar.jsx";

const AdminInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);

  const API_PRODUCTS_URL = "/products";

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await fetch(API_PRODUCTS_URL);
      if (!response.ok) throw new Error("Failed to fetch inventory");
      const data = await response.json();
      setInventory(data);
    } catch (error) {
      console.error("Error loading inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  // Logic to handle filtering
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filterCategory === "All" || item.category === filterCategory;
    
    const matchesStatus = filterStatus === "All" || 
      (filterStatus === "Low Stock" && item.stock <= 10 && item.stock > 0) ||
      (filterStatus === "Out of Stock" && item.stock === 0) ||
      (filterStatus === "In Stock" && item.stock > 10);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get unique categories for the filter dropdown
  const categories = ["All", ...new Set(inventory.map(item => item.category).filter(Boolean))];

  const lowStockCount = inventory.filter(item => item.stock <= 10 && item.stock > 0).length;

  return (
    <div className="flex min-h-screen lg:ml-64 bg-gray-50">
      <AdminSidebar />

      <main className="flex-1 p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-amber-900">Inventory Management</h1>
            <p className="text-gray-600">Track and manage your timber stock levels</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors shadow-sm">
              <Download size={18} />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-medium transition-colors shadow-md">
              <Plus size={18} />
              Add Stock
            </button>
          </div>
        </div>

        {/* Inventory Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Total Items</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{inventory.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Low Stock Alerts</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-3xl font-bold text-red-600">{lowStockCount}</p>
              {lowStockCount > 0 && <AlertTriangle className="text-red-500" size={24} />}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Out of Stock</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {inventory.filter(item => item.stock === 0).length}
            </p>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white p-4 rounded-t-xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by product name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-400" />
                <select 
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <select 
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>

              {(filterCategory !== "All" || filterStatus !== "All" || searchTerm !== "") && (
                <button 
                  onClick={() => {setFilterCategory("All"); setFilterStatus("All"); setSearchTerm("");}}
                  className="flex items-center gap-1 text-sm text-amber-700 hover:text-amber-900 font-medium"
                >
                  <X size={14} /> Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white border border-gray-200 rounded-b-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Product Details</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Stock Level</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Price</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-10 text-center text-gray-500">Loading inventory...</td>
                  </tr>
                ) : filteredInventory.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                      No products match your filters.
                    </td>
                  </tr>
                ) : (
                  filteredInventory.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500 uppercase">ID: {item._id.substring(0, 8)}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {item.category || "Uncategorized"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className={`font-medium ${item.stock <= 10 ? 'text-red-600' : 'text-gray-900'}`}>
                            {item.stock} units
                          </span>
                          <div className="w-24 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${item.stock <= 10 ? 'bg-red-500' : 'bg-green-500'}`}
                              style={{ width: `${Math.min((item.stock / 50) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.stock > 10 
                            ? 'bg-green-100 text-green-800' 
                            : item.stock > 0 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.stock > 10 ? 'In Stock' : item.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        ₹{item.price?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-amber-700 transition-colors">
                          <MoreVertical size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminInventory;