import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Save, X, Plus, Upload } from 'lucide-react';
import AdminSidebar from '../../Components/AdminSideNavbar.jsx';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    type: '',
    dimensions: '',
    stock: 0,
    price: 0,
    image: ''
  });

  // Replace this URL with your actual backend endpoint
  const API_BASE_URL = 'http://localhost:3000/api/products';

  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to sample data if backend is not available
      setProducts([
        {
          id: 1,
          name: 'Oak Timber',
          type: 'Hardwood',
          dimensions: '2x4x8',
          stock: 150,
          price: 45.99,
          image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400'
        },
        {
          id: 2,
          name: 'Pine Timber',
          type: 'Softwood',
          dimensions: '2x6x10',
          stock: 200,
          price: 32.50,
          image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400'
        }
      ]);
    }
  };

  // Update product
  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });
      
      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(products.map(p => p.id === id ? updatedProduct : p));
        setEditingId(null);
        setEditForm({});
      }
    } catch (error) {
      console.error('Error updating product:', error);
      // Fallback: update locally if backend fails
      setProducts(products.map(p => p.id === id ? { ...p, ...editForm } : p));
      setEditingId(null);
      setEditForm({});
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setProducts(products.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      // Fallback: delete locally if backend fails
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // Add new product
  const handleAdd = async () => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      
      if (response.ok) {
        const addedProduct = await response.json();
        setProducts([...products, addedProduct]);
        setShowAddForm(false);
        setNewProduct({ name: '', type: '', dimensions: '', stock: 0, price: 0, image: '' });
      }
    } catch (error) {
      console.error('Error adding product:', error);
      // Fallback: add locally if backend fails
      const tempProduct = { ...newProduct, id: Date.now() };
      setProducts([...products, tempProduct]);
      setShowAddForm(false);
      setNewProduct({ name: '', type: '', dimensions: '', stock: 0, price: 0, image: '' });
    }
  };

  // Start editing
  const startEdit = (product) => {
    setEditingId(product.id);
    setEditForm(product);
  };

  // Image upload handler
  const handleImageUpload = (e, isNew = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isNew) {
          setNewProduct({ ...newProduct, image: reader.result });
        } else {
          setEditForm({ ...editForm, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Sidebar Component */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 mt-16 lg:mt-0">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-amber-900">Timber Product Management</h1>
                <p className="text-gray-600 mt-2">Manage your timber inventory and stock levels</p>
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

          {/* Add Product Form */}
          {showAddForm && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-amber-900 mb-4">Add New Product</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input
                  type="text"
                  placeholder="Type (e.g., Hardwood)"
                  value={newProduct.type}
                  onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input
                  type="text"
                  placeholder="Dimensions (e.g., 2x4x8)"
                  value={newProduct.dimensions}
                  onChange={(e) => setNewProduct({ ...newProduct, dimensions: e.target.value })}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <div className="flex items-center gap-2">
                  <label className="flex-1 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 flex items-center gap-2">
                    <Upload size={20} />
                    <span className="text-sm text-gray-600">Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, true)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              {newProduct.image && (
                <div className="mt-4">
                  <img src={newProduct.image} alt="Preview" className="h-32 w-32 object-cover rounded-lg" />
                </div>
              )}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleAdd}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Save Product
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewProduct({ name: '', type: '', dimensions: '', stock: 0, price: 0, image: '' });
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Product Image */}
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {editingId === product.id && (
                    <label className="absolute top-2 right-2 bg-white p-2 rounded-full cursor-pointer hover:bg-gray-100">
                      <Upload size={20} className="text-amber-600" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, false)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-5">
                  {editingId === product.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <input
                        type="text"
                        value={editForm.type}
                        onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <input
                        type="text"
                        value={editForm.dimensions}
                        onChange={(e) => setEditForm({ ...editForm, dimensions: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <input
                        type="number"
                        value={editForm.stock}
                        onChange={(e) => setEditForm({ ...editForm, stock: parseInt(e.target.value) || 0 })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <input
                        type="number"
                        step="0.01"
                        value={editForm.price}
                        onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) || 0 })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-amber-900">{product.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">{product.type}</p>
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Dimensions:</span>
                          <span className="font-semibold">{product.dimensions}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Stock:</span>
                          <span className={`font-semibold ${product.stock < 50 ? 'text-red-600' : 'text-green-600'}`}>
                            {product.stock} units
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-semibold text-amber-700">${product.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    {editingId === product.id ? (
                      <>
                        <button
                          onClick={() => handleUpdate(product.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <Save size={18} />
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditForm({});
                          }}
                          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <X size={18} />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(product)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <Edit2 size={18} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <Trash2 size={18} />
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <p className="text-gray-500 text-lg">No products found. Add your first timber product!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;