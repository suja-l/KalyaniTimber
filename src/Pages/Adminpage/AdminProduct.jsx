// src/Pages/Adminpage/AdminProduct.jsx

import React, { useState, useEffect } from "react";
import { Trash2, Edit2, Save, X, Plus, Upload, Package } from "lucide-react";
import AdminSidebar from "../../Components/AdminSideNavbar.jsx";
import { countries } from "../../data/countries"; // <-- IMPORT THE COUNTRIES

// --- Define your dropdown options here ---
const brandOptions = [
  { name: "Select Brand...", value: "" },
  { name: "Greenply", value: "Greenply" },
  { name: "CenturyPLY", value: "CenturyPLY" },
  { name: "Merino", value: "Merino" },
  { name: "Local Sourced", value: "Local" },
  { name: "Imported", value: "Imported" },
  { name: "Other", value: "Other" },
];

const categoryOptions = [
  { name: "Select Category...", value: "" },
  { name: "Hardwood", value: "Hardwood" },
  { name: "Softwood", value: "Softwood" },
  { name: "Plywood", value: "Plywood" },
  { name: "Engineered Wood", value: "Engineered Wood" },
  { name: "Laminate", value: "Laminate" },
  { name: "Hardware", value: "Hardware" },
  { name: "Adhesive", value: "Adhesive" },
];

const unitOptions = [
  { name: "Select Unit...", value: "" },
  { name: "sq ft", value: "sq ft" },
  { name: "cubic ft", value: "cubic ft" },
  { name: "piece", value: "piece" },
  { name: "kg", value: "kg" },
  { name: "sheet", value: "sheet" },
  { name: "running ft", value: "running ft" },
];
// --- End of dropdown options ---

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);

  // --- STATE ALIGNED WITH MONGOOSE SCHEMA ---
  const initialNewProductState = {
    name: "",
    category: "",
    brand: "",
    price: 0,
    unit: "",
    description: "",
    imageUrl: "",
    tags: "",
    specs: {
      density: "",
      origin: "",
      grade: "",
    },
  };
  const [newProduct, setNewProduct] = useState(initialNewProductState);

  // Uses the configured Vite proxy
  const API_BASE_URL = "/products";

  // --- 1. FETCH PRODUCTS (READ) ---
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching live products:", error);
      setProducts([
        {
          _id: "dummy1", name: "Teak Wood (Fallback)", category: "Hardwood",
          brand: "Local", price: 1500.0, unit: "sq ft",
          description: "Sample fallback data loaded.",
          imageUrl: "https://via.placeholder.com/400x200?text=Fallback",
          tags: ["teak"], specs: { origin: "India", grade: "A+" },
        },
      ]);
    }
  };

  // --- 2. ADD PRODUCT (CREATE) ---
  const handleAdd = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category ||
        !newProduct.unit || !newProduct.description || !newProduct.imageUrl) {
      alert("All core product fields are required.");
      return;
    }
    const dataToSend = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      tags: newProduct.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag),
    };
    try {
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        const addedProduct = await response.json();
        setProducts([...products, addedProduct]);
        setShowAddForm(false);
        setNewProduct(initialNewProductState);
        alert("Product added successfully to MongoDB!");
      } else {
        const errorText = await response.text();
        alert(`Failed to add product. Server error: ${errorText}`);
      }
    } catch (error) {
      console.error("Network Error during Add:", error);
      alert("Network error. Check if Node.js server is running.");
    }
  };

  // --- 3. UPDATE PRODUCT (UPDATE) ---
  const handleUpdate = async (id) => {
    const dataToSend = {
      ...editForm,
      price: parseFloat(editForm.price),
      tags: editForm.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag),
    };
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(products.map((p) => (p._id === id ? updatedProduct : p)));
        setEditingId(null);
        setEditForm({});
        alert("Product updated successfully!");
      } else {
        const errorText = await response.text();
        alert(`Failed to update product: ${errorText}`);
      }
    } catch (error) {
      console.error("Network error during update:", error);
    }
  };

  // --- 4. DELETE PRODUCT (DELETE) ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
      if (response.ok) {
        setProducts(products.filter((p) => p._id !== id));
        alert("Product deleted successfully!");
      } else {
        const errorText = await response.text();
        alert(`Failed to delete product: ${errorText}`);
      }
    } catch (error) {
      console.error("Network error during delete:", error);
    }
  };

  // --- 5. START EDIT (Ensures .specs is an object) ---
  const startEdit = (product) => {
    setEditingId(product._id || product.id);
    setEditForm({
      ...product,
      specs: product.specs || { density: "", origin: "", grade: "" },
      tags: Array.isArray(product.tags) ? product.tags.join(", ") : product.tags || "",
    });
  };

  // Image upload handler
  const handleImageUpload = (e, isNew = false) => {
    // (No changes to this function)
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result;
        if (isNew) setNewProduct({ ...newProduct, imageUrl: url });
        else setEditForm({ ...editForm, imageUrl: url });
      };
      reader.readAsDataURL(file);
    }
  };

  const formInputClass = "border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full";

  return (
    <div className="flex min-h-screen lg:ml-64 bg-gradient-to-br from-amber-50 to-orange-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6 mt-16 lg:mt-0">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-amber-900">
                  Timber Product Management
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage your timber inventory and stock levels
                </p>
              </div>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus size={20} />
                Add Product
              </button>
            </div>
          </div>

          {/* --- ADD PRODUCT FORM JSX (MODIFIED) --- */}
          {showAddForm && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-amber-900 mb-4">
                Add New Product
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Product Name */}
                <input
                  type="text" placeholder="1. Product Name (Required)"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className={formInputClass}
                />
                
                {/* Category Dropdown */}
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className={formInputClass}
                >
                  {categoryOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
                </select>
                
                {/* Brand Dropdown */}
                <select
                  value={newProduct.brand}
                  onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                  className={formInputClass}
                >
                  {brandOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
                </select>
                
                {/* Price */}
                <input
                  type="number" step="0.01" placeholder="4. Price (Required)"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className={formInputClass}
                />
                
                {/* Unit Dropdown */}
                <select
                  value={newProduct.unit}
                  onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                  className={formInputClass}
                >
                  {unitOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
                </select>

                {/* Image URL */}
                <input
                  type="url" placeholder="6. Image URL (Required)"
                  value={newProduct.imageUrl}
                  onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                  className={formInputClass}
                />
                
                {/* Tags */}
                <input
                  type="text" placeholder="7. Tags (Comma separated)"
                  value={newProduct.tags}
                  onChange={(e) => setNewProduct({ ...newProduct, tags: e.target.value })}
                  className={`${formInputClass} md:col-span-2`}
                />

                {/* Description */}
                <textarea
                  placeholder="8. Detailed Description (Required)" rows="3"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className={`${formInputClass} md:col-span-3`}
                />

                {/* SPECS FIELDS */}
                <h3 className="text-sm font-semibold text-gray-700 mt-2 md:col-span-3">
                  Specification Details (Optional):
                </h3>
                
                {/* Density */}
                <input
                  type="text" placeholder="Density"
                  value={newProduct.specs.density}
                  onChange={(e) => setNewProduct({ ...newProduct, specs: { ...newProduct.specs, density: e.target.value } })}
                  className={formInputClass}
                />
                
                {/* Origin Dropdown */}
                <select
                  value={newProduct.specs.origin}
                  onChange={(e) => setNewProduct({ ...newProduct, specs: { ...newProduct.specs, origin: e.target.value } })}
                  className={formInputClass}
                >
                  {countries.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
                </select>
                
                {/* Grade */}
                <input
                  type="text" placeholder="Grade"
                  value={newProduct.specs.grade}
                  onChange={(e) => setNewProduct({ ...newProduct, specs: { ...newProduct.specs, grade: e.target.value } })}
                  className={formInputClass}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleAdd}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Save size={20} /> Save Product
                </button>
                <button
                  onClick={() => { setShowAddForm(false); setNewProduct(initialNewProductState); }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <X size={20} /> Cancel
                </button>
              </div>
            </div>
          )}

          {/* --- PRODUCTS GRID (MODIFIED EDIT FORM) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.length === 0 && (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center md:col-span-4">
                <Package size={32} className="text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 text-lg">
                  No products found. Add your first timber product!
                </p>
              </div>
            )}

            {products.map((product) => (
              <div
                key={product._id || product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={product.imageUrl} alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {editingId === product._id && (
                    <label className="absolute top-2 right-2 bg-white p-2 rounded-full cursor-pointer hover:bg-gray-100">
                      <Upload size={20} className="text-amber-600" />
                      <input type="file" accept="image/*"
                        onChange={(e) => handleImageUpload(e, false)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-5">
                  {editingId === product._id ? (
                    <div className="space-y-3">
                      {/* --- EDITING INPUTS (NOW DROPDOWNS) --- */}
                      <input type="text" value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className={formInputClass} placeholder="Name"
                      />
                      
                      <select value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        className={formInputClass}
                      >
                        {categoryOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
                      </select>
                      
                      <select value={editForm.brand}
                        onChange={(e) => setEditForm({ ...editForm, brand: e.target.value })}
                        className={formInputClass}
                      >
                         {/* Add a default option if brand is missing, just in case */}
                        {!brandOptions.some(opt => opt.value === editForm.brand) && editForm.brand &&
                          <option value={editForm.brand}>{editForm.brand} (Custom)</option>
                        }
                        {brandOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
                      </select>
                      
                      <select value={editForm.unit}
                        onChange={(e) => setEditForm({ ...editForm, unit: e.target.value })}
                        className={formInputClass}
                      >
                        {!unitOptions.some(opt => opt.value === editForm.unit) && editForm.unit &&
                          <option value={editForm.unit}>{editForm.unit} (Custom)</option>
                        }
                        {unitOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
                      </select>

                      <input type="text" value={editForm.tags}
                        onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                        className={formInputClass} placeholder="Tags"
                      />
                      <input type="number" step="0.01" value={editForm.price}
                        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                        className={formInputClass} placeholder="Price"
                      />
                      <textarea value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className={formInputClass} placeholder="Description" rows={3}
                      />
                      
                      <h4 className="text-sm font-semibold pt-2">Specs:</h4>
                      
                      <select value={editForm.specs.origin}
                        onChange={(e) => setEditForm({ ...editForm, specs: { ...editForm.specs, origin: e.target.value } })}
                        className={formInputClass}
                      >
                         {!countries.some(opt => opt.value === editForm.specs.origin) && editForm.specs.origin &&
                          <option value={editForm.specs.origin}>{editForm.specs.origin} (Custom)</option>
                        }
                        {countries.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
                      </select>

                      <input type="text" value={editForm.specs.density}
                        onChange={(e) => setEditForm({ ...editForm, specs: { ...editForm.specs, density: e.target.value } })}
                        className={formInputClass} placeholder="Density"
                      />
                      <input type="text" value={editForm.specs.grade}
                        onChange={(e) => setEditForm({ ...editForm, specs: { ...editForm.specs, grade: e.targe.value } })}
                        className={formInputClass} placeholder="Grade"
                      />
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-amber-900">{product.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">Category: {product.category}</p>
                      <p className="text-gray-600 text-sm mt-1">Brand: {product.brand || "N/A"}</p>
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Origin:</span>
                          <span className="font-semibold">{product.specs?.origin || "N/A"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Grade:</span>
                          <span className="font-semibold">{product.specs?.grade || "N/A"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tags:</span>
                          <span className="font-semibold text-gray-700">{product.tags?.join(", ") || "None"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Unit:</span>
                          <span className="font-semibold text-gray-700">{product.unit}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-semibold text-amber-700">₹{product.price?.toFixed(2) || "0.00"}</span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    {editingId === product._id ? (
                      <>
                        <button
                          onClick={() => handleUpdate(product._id)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <Save size={18} /> Save
                        </button>
                        <button
                          onClick={() => { setEditingId(null); setEditForm({}); }}
                          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <X size={18} /> Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(product)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <Edit2 size={18} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <Trash2 size={18} /> Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;