import React, { useState, useEffect } from 'react';
import {
  Package,
  TrendingUp,
  AlertCircle,
  DollarSign,
  Users,
  ShoppingCart,
  ArrowRight,
  BarChart3,
  Home,
  Menu,
  X,
  LogOut,
  Settings,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminHomepage = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    totalRevenue: 0,
    recentOrders: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const API_BASE_URL = 'http://localhost:3000/api';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
      const data = await response.json();
      setStats(data.stats);
      setRecentActivity(data.recentActivity);
      setLowStockProducts(data.lowStockProducts);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Fallback demo data
      setStats({
        totalProducts: 45,
        lowStock: 8,
        totalRevenue: 125840.5,
        recentOrders: 23,
      });
      setRecentActivity([
        { id: 1, type: 'order', message: 'New order #1234 - Oak Timber', time: '5 min ago' },
        { id: 2, type: 'stock', message: 'Low stock alert: Pine Timber', time: '15 min ago' },
        { id: 3, type: 'product', message: 'Product added: Maple Timber', time: '1 hour ago' },
        { id: 4, type: 'order', message: 'Order #1233 completed', time: '2 hours ago' },
      ]);
      setLowStockProducts([
        { id: 1, name: 'Pine Timber 2x4x8', stock: 12, minStock: 50 },
        { id: 2, name: 'Oak Timber 2x6x10', stock: 8, minStock: 30 },
        { id: 3, name: 'Cedar Planks', stock: 15, minStock: 40 },
      ]);
    }
  };

  const NavItem = ({ icon: Icon, title, link, active }) => (
    <Link
      to={link}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        active
          ? 'bg-amber-700 text-white'
          : 'text-amber-100 hover:bg-amber-800 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{title}</span>
    </Link>
  );

  const StatCard = ({ icon: Icon, title, value, subtitle, color, trend }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="text-white" size={24} />
        </div>
        {trend && (
          <div className="flex items-center text-green-600 text-sm font-semibold">
            <TrendingUp size={16} className="mr-1" />
            {trend}
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
      </div>
    </div>
  );

  const QuickAction = ({ icon: Icon, title, description, link, color }) => (
    <Link
      to={link}
      className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:scale-105"
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="text-white" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-gray-600 text-sm mt-1">{description}</p>
        </div>
        <ArrowRight className="text-gray-400" size={20} />
      </div>
    </Link>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-amber-900 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-6 flex items-center justify-between border-b border-amber-800">
          {sidebarOpen ? (
            <>
              <h2 className="text-xl font-bold">Timber Admin</h2>
              <button onClick={() => setSidebarOpen(false)} className="hover:bg-amber-800 p-2 rounded">
                <X size={20} />
              </button>
            </>
          ) : (
            <button onClick={() => setSidebarOpen(true)} className="hover:bg-amber-800 p-2 rounded mx-auto">
              <Menu size={20} />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarOpen ? (
            <>
              <NavItem icon={Home} title="Dashboard" link="/admin" active />
              <NavItem icon={Package} title="Products" link="/admin/products" />
              <NavItem icon={ShoppingCart} title="Orders" link="/admin/orders" />
              <NavItem icon={Users} title="Customers" link="/admin/customers" />
              <NavItem icon={BarChart3} title="Analytics" link="/admin/analytics" />
              <NavItem icon={Settings} title="Settings" link="/admin/settings" />
            </>
          ) : (
            <div className="space-y-4">
              <Link to="/admin" className="flex justify-center p-3 bg-amber-700 rounded-lg">
                <Home size={20} />
              </Link>
              <Link to="/admin/products" className="flex justify-center p-3 hover:bg-amber-800 rounded-lg">
                <Package size={20} />
              </Link>
              <Link to="/admin/orders" className="flex justify-center p-3 hover:bg-amber-800 rounded-lg">
                <ShoppingCart size={20} />
              </Link>
              <Link to="/admin/customers" className="flex justify-center p-3 hover:bg-amber-800 rounded-lg">
                <Users size={20} />
              </Link>
              <Link to="/admin/analytics" className="flex justify-center p-3 hover:bg-amber-800 rounded-lg">
                <BarChart3 size={20} />
              </Link>
              <Link to="/admin/settings" className="flex justify-center p-3 hover:bg-amber-800 rounded-lg">
                <Settings size={20} />
              </Link>
            </div>
          )}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-amber-800">
          {sidebarOpen ? (
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-amber-800 rounded-lg transition-colors">
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          ) : (
            <button className="w-full flex justify-center p-3 hover:bg-amber-800 rounded-lg">
              <LogOut size={20} />
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-md sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-amber-900">Dashboard Overview</h1>
                <p className="text-gray-600 text-sm mt-1">Welcome back! Here's your business overview</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Last updated</p>
                  <p className="text-sm font-semibold text-gray-700">{new Date().toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard icon={Package} title="Total Products" value={stats.totalProducts} subtitle="Active inventory items" color="bg-blue-600" trend="+12%" />
            <StatCard icon={AlertCircle} title="Low Stock Items" value={stats.lowStock} subtitle="Requires attention" color="bg-red-600" />
            <StatCard icon={DollarSign} title="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} subtitle="This month" color="bg-green-600" trend="+8.2%" />
            <StatCard icon={ShoppingCart} title="Recent Orders" value={stats.recentOrders} subtitle="Last 24 hours" color="bg-purple-600" trend="+5" />
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <QuickAction icon={Package} title="Manage Products" description="View and edit inventory" link="/admin/products" color="bg-blue-600" />
              <QuickAction icon={ShoppingCart} title="View Orders" description="Process customer orders" link="/admin/orders" color="bg-green-600" />
              <QuickAction icon={Users} title="Customers" description="Manage customer data" link="/admin/customers" color="bg-purple-600" />
              <QuickAction icon={BarChart3} title="Analytics" description="View detailed reports" link="/admin/analytics" color="bg-orange-600" />
            </div>
          </div>

          {/* Recent Activity + Low Stock */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-amber-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0">
                    <div
                      className={`p-2 rounded-lg ${
                        activity.type === 'order'
                          ? 'bg-green-100'
                          : activity.type === 'stock'
                          ? 'bg-red-100'
                          : 'bg-blue-100'
                      }`}
                    >
                      {activity.type === 'order' ? (
                        <ShoppingCart size={20} className="text-green-600" />
                      ) : activity.type === 'stock' ? (
                        <AlertCircle size={20} className="text-red-600" />
                      ) : (
                        <Package size={20} className="text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{activity.message}</p>
                      <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-amber-700 hover:text-amber-900 font-semibold text-sm py-2 border border-amber-300 rounded-lg hover:bg-amber-50 transition-colors">
                View All Activity
              </button>
            </div>

            {/* Low Stock Alerts */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="text-red-600" size={24} />
                <h2 className="text-xl font-bold text-amber-900">Low Stock Alerts</h2>
              </div>
              <div className="space-y-4">
                {lowStockProducts.map((product) => (
                  <div key={product.id} className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-600">Current: {product.stock}</span>
                      <span className="text-xs text-red-600 font-semibold">Min: {product.minStock}</span>
                    </div>
                    <div className="w-full bg-red-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-red-600 h-2 rounded-full"
                        style={{ width: `${(product.stock / product.minStock) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/admin/products"
                className="block w-full mt-4 text-center bg-red-600 hover:bg-red-700 text-white font-semibold text-sm py-2 rounded-lg transition-colors"
              >
                Restock Items
              </Link>
            </div>
          </div>

          {/* Sales Chart Placeholder */}
          <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-amber-900 mb-4">Sales Overview</h2>
            <div className="h-64 flex items-center justify-center bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg">
              <div className="text-center">
                <BarChart3 size={48} className="text-amber-600 mx-auto mb-2" />
                <p className="text-gray-600">Chart visualization coming soon</p>
                <p className="text-sm text-gray-500 mt-1">Connect analytics API to display data</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;
