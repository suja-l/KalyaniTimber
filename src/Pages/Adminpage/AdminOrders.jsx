// src/Pages/Adminpage/AdminOrders.jsx

import React, { useState } from "react";
import {
  ShoppingCart,
  Loader,
  AlertCircle,
  Truck,
  CheckCircle,
  XCircle,
  ChevronDown,
} from "lucide-react";
import AdminSidebar from "../../Components/AdminSideNavbar.jsx";
import { useOrders } from "../../hooks/useOrders.js";

// Helper component for the status badge
const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Shipped: "bg-blue-100 text-blue-800 border-blue-300",
    Delivered: "bg-green-100 text-green-800 border-green-300",
    Cancelled: "bg-red-100 text-red-800 border-red-300",
  };
  const icon = {
    Pending: <Loader size={14} className="mr-1.5" />,
    Shipped: <Truck size={14} className="mr-1.5" />,
    Delivered: <CheckCircle size={14} className="mr-1.5" />,
    Cancelled: <XCircle size={14} className="mr-1.5" />,
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        styles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {icon[status]}
      {status}
    </span>
  );
};

// This component will handle the logic for updating status
const StatusUpdater = ({ order, onUpdate }) => {
  const [currentStatus, setCurrentStatus] = useState(order.status);
  const [isSaving, setIsSaving] = useState(false);

  const handleStatusChange = async (newStatus) => {
    if (newStatus === currentStatus) return;
    
    setIsSaving(true);
    try {
      const response = await fetch(`/orders/${order._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      
      const updatedOrder = await response.json();
      setCurrentStatus(updatedOrder.status);
      onUpdate(updatedOrder); // Update the parent state
      alert("Status updated!");

    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative">
      <select
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={isSaving}
        className="appearance-none w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-2.5 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <option value="Pending">Pending</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>
      <ChevronDown size={18} className="absolute right-2.5 top-3 text-gray-500 pointer-events-none" />
    </div>
  );
};


const OrderPage = () => {
  const { orders, isLoading, error, setOrders } = useOrders();
  
  // This function will be passed to the StatusUpdater to update the list
  const handleOrderUpdate = (updatedOrder) => {
    setOrders(prevOrders => 
      prevOrders.map(o => o._id === updatedOrder._id ? updatedOrder : o)
    );
  };

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
                  Order Management
                </h1>
                <p className="text-gray-600 mt-2">
                  View and manage all customer orders
                </p>
              </div>
              <div className="flex items-center gap-2 bg-amber-100 text-amber-900 p-3 rounded-lg">
                <ShoppingCart size={24} />
                <span className="text-2xl font-bold">{orders.length}</span>
                <span className="text-gray-700">Total Orders</span>
              </div>
            </div>
          </div>

          {/* Loading and Error States */}
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <Loader size={48} className="animate-spin text-amber-700" />
            </div>
          )}

          {error && (
            <div className="flex justify-center items-center h-64 bg-red-50 border border-red-300 rounded-lg p-6">
              <AlertCircle size={48} className="text-red-600 mr-4" />
              <div>
                <h2 className="text-xl font-bold text-red-800">
                  Error Fetching Orders
                </h2>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Orders Table */}
          {!isLoading && !error && (
            <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Order ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Update Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 truncate" style={{maxWidth: '100px'}}>
                          {order._id}
                        </div>
                        <div className="text-xs text-gray-500">{order.items.length} items</div>
                      </td>
                       <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                         <div className="text-xs text-gray-500">
                          {new Date(order.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.customerName}
                        </div>
                        <div className="text-sm text-gray-500">{order.customerEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          ₹{order.totalPrice.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                         <StatusUpdater order={order} onUpdate={handleOrderUpdate} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {orders.length === 0 && (
                 <div className="p-12 text-center">
                    <ShoppingCart size={32} className="text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 text-lg">No orders found.</p>
                  </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage; // <-- THIS LINE FIXES THE ERROR