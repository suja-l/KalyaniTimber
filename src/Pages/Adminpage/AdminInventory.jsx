import React, { useState, useEffect } from "react";
import { 
  Search, 
  Plus, 
  Filter, 
  AlertTriangle, 
  MoreVertical,
  Download,
  X,
  Edit2,
  Save
} from "lucide-react";
import AdminSidebar from "../../Components/AdminSideNavbar.jsx";

const AdminInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  
  // Modal states for editing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newStock, setNewStock] = useState(0);
  const [newWarehouse, setNewWarehouse] = useState("");

  const API_PRODUCTS_URL = "/products";

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
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

  const openEditModal = (item) => {
    setEditingItem(item);
    setNewStock(item.stock);
    setNewWarehouse(item.warehouse || "Kalyani Doors");
    setIsModalOpen(true);
  };

  // Corrected handleUpdate to use the PATCH /inventory/:id route
  const handleUpdate = async () => {
    if (!editingItem) return;

    try {
      const response = await fetch(`${API_PRODUCTS_URL}/inventory/${editingItem._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stock: Number(newStock),
          warehouse: newWarehouse,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData || "Failed to update inventory");
      }

      // Refresh local state, close modal, and notify user
      await fetchInventory(); 
      setIsModalOpen(false);
     
    } catch (error) {
      console.error("Update Error:", error);
      alert("Error updating database: " + error.message);
    }
  };

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

  const categories = ["All", ...new Set(inventory.map(item => item.category).filter(Boolean))];
  const lowStockCount = inventory.filter(item => item.stock <= 10 && item.stock > 0).length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64 p-4 md:p-8 w-full transition-all duration-300">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-amber-900">Inventory Management</h1>
            <p className="text-gray-600">Track and manage your timber stock levels</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium shadow-sm transition-all">
              <Download size={18} />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-medium shadow-md transition-all">
              <Plus size={18} />
              Add Stock
            </button>
          </div>
        </div>

        {/* Stats Cards */}
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
        <div className="bg-white p-4 rounded-t-xl border border-gray-200 shadow-sm mb-0 relative z-10">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-2 flex-1 md:flex-none">
                <Filter size={18} className="text-gray-400" />
                <select 
                  className="w-full md:w-auto border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <select 
                className="flex-1 md:flex-none border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
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
                  className="flex items-center gap-1 text-sm text-amber-700 hover:text-amber-900 font-medium px-2 py-1"
                >
                  <X size={14} /> Clear Filters
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
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Product</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Warehouse</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Stock</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan="5" className="px-6 py-10 text-center text-gray-500">Loading...</td></tr>
                ) : filteredInventory.length === 0 ? (
                  <tr><td colSpan="5" className="px-6 py-10 text-center text-gray-500">No results found.</td></tr>
                ) : (
                  filteredInventory.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-400 uppercase">{item.category}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.warehouse || "Kalyani Doors"}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {item.stock} units
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          item.stock > 10 ? 'bg-green-100 text-green-800' : 
                          item.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.stock > 10 ? 'In Stock' : item.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => openEditModal(item)}
                          className="p-2 text-gray-400 hover:text-amber-700 rounded-lg hover:bg-amber-50 transition-all"
                        >
                          <Edit2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
            
        {/* Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
              <div className="p-6 border-b flex justify-between items-center bg-amber-50">
                <h2 className="text-xl font-bold text-amber-900">Edit Inventory</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Update Stock Quantity</label>
                  <input 
                    type="number" 
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Warehouse Location</label>
                  <select 
                    value={newWarehouse}
                    onChange={(e) => setNewWarehouse(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  >
                    <option value="KD">KD</option>
                    <option value="KTM">KTM</option>
                    <option value="BOTH">Both</option>
                  </select>
                </div>
              </div>

              <div className="p-6 bg-gray-50 flex gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-white transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdate}
                  className="flex-1 px-4 py-2 bg-amber-700 text-white rounded-lg font-medium hover:bg-amber-800 flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminInventory;