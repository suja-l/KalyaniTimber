
import React from 'react';
import {
  LayoutDashboard,
  Home,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  DollarSign,
  MessageSquare,
  ChevronRight,
  Edit2,
  Trash2,
  PlusCircle,
} from 'lucide-react';

// Dummy data for the product table
const products = [
  { id: 1, name: 'Premium Oak Planks', sku: 'OAK-123', price: 120.50, stock: 150 },
  { id: 2, name: 'Cedar Beams (8ft)', sku: 'CDR-8FT', price: 85.00, stock: 80 },
  { id: 3, name: 'Eco-Friendly Pine', sku: 'PNE-ECO', price: 45.99, stock: 300 },
  { id: 4, name: 'Walnut Veneer Sheet', sku: 'WNT-VNR', price: 65.20, stock: 210 },
];

// Reusable component for Form Inputs
const FormInput = ({ label, id, value, type = 'text' }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      defaultValue={value}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />
  </div>
);

// Reusable component for Feature Card Form
const FeatureCardForm = ({ title, description }) => (
  <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
    <FormInput label="Card Title" id={`feature_${title}`} value={title} />
    <FormInput label="Card Description" id={`feature_desc_${title}`} value={description} />
    <button
      type="button"
      className="mt-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Save Card
    </button>
  </div>
);

// Main Admin Page Component
export default function AdminPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* === Sidebar Navigation === */}
      <aside className="fixed left-0 top-0 z-10 h-full w-64 -translate-x-full bg-gray-800 text-white transition-transform sm:translate-x-0">
        <div className="flex h-16 items-center justify-center px-6">
          <h2 className="text-2xl font-semibold">TimberCraft Admin</h2>
        </div>
        <nav className="mt-4">
          <a
            href="#"
            className="flex items-center bg-gray-900 px-6 py-3 text-white"
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-700">
            <Home className="mr-3 h-5 w-5" />
            Manage Homepage
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-700">
            <Package className="mr-3 h-5 w-5" />
            Products
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-700">
            <ShoppingCart className="mr-3 h-5 w-5" />
            Orders
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-700">
            <Users className="mr-3 h-5 w-5" />
            Customers
          </a>
          <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-700">
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </a>
        </nav>
        <div className="absolute bottom-0 w-full">
          <a
            href="#"
            className="flex items-center border-t border-gray-700 px-6 py-4 hover:bg-gray-700"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Log Out
          </a>
        </div>
      </aside>

      {/* === Main Content Area === */}
      <main className="flex-1 p-10 sm:ml-64">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

        {/* --- Stats Cards --- */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Products</p>
                <p className="text-3xl font-semibold text-gray-900">150</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <p className="text-3xl font-semibold text-gray-900">$12,850</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">New Orders</p>
                <p className="text-3xl font-semibold text-gray-900">32</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">New Messages</p>
                <p className="text-3xl font-semibold text-gray-900">5</p>
              </div>
              <MessageSquare className="h-8 w-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* --- Manage Homepage Content (Based on your image) --- */}
        <div className="mt-10 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Manage Homepage Content
          </h2>
          
          {/* Hero Section Form */}
          <div className="space-y-4 rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-medium">Hero Section</h3>
            <FormInput
              label="Main Heading"
              id="hero_title"
              value="Quality Timber Products"
            />
            <FormInput
              label="Subheading"
              id="hero_subtitle"
              value="We provide premium timber for all your construction needs."
            />
            <FormInput
              label="Button Text"
              id="hero_button"
              value="Get Started"
            />
            <button
              type="button"
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
            >
              Save Hero Content
            </button>
          </div>

          {/* Feature Cards Form */}
          <div className="mt-6 space-y-4">
             <h3 className="text-lg font-medium">Feature Cards</h3>
             <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <FeatureCardForm
                    title="Sustainable Sources"
                    description="Eco-friendly timber from responsibly managed forest"
                />
                <FeatureCardForm
                    title="Expert Craftsmanship"
                    description="Skilled craftsmanship for durable timber products"
                />
                <FeatureCardForm
                    title="Custom Solutions"
                    description="Tailored timber products for your construction projects"
                />
             </div>
          </div>
        </div>

        {/* --- Product Management Table --- */}
        <div className="mt-10 rounded-lg bg-white shadow-md">
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Product Management
            </h2>
            <button
              type="button"
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              <PlusCircle className="h-4 w-4" />
              Add New Product
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Product Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">SKU</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Stock</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{product.sku}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">${product.price.toFixed(2)}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{product.stock}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        <Edit2 className="inline h-4 w-4" />
                      </a>
                      <a href="#" className="ml-4 text-red-600 hover:text-red-900">
                        <Trash2 className="inline h-4 w-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}