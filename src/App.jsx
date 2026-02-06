// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Homepage from "./Pages/Homepage/homepage";
import AdminPage from "./Pages/Adminpage/AdminPage.jsx";
import AdminProduct from "./Pages/Adminpage/AdminProduct.jsx";
import AdminOrders from "./Pages/Adminpage/AdminOrders.jsx";
import AdminInventory from "./Pages/Adminpage/AdminInventory.jsx";
import ProductListingPage from "./Pages/ProductsPage/ProductListingPage.jsx";
import ProductDetailPage from "./Pages/ProductsPage/ProductDetailPage.jsx";
import CartPage from "./Pages/CartPage/CartPage.jsx"; 
import FavoritesPage from "./Pages/FavoritesPage/FavoritesPage.jsx"; 
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./Pages/LoginPage/RegisterPage.jsx";  
import ForgotPassword from "./Pages/LoginPage/ForgotPassword.jsx"; //
import ResetPassword from "./Pages/LoginPage/ResetPassword.jsx";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="">
        <Navbar />
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />     
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* ADDED ROUTE */}
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} /> 
          <Route path="/favorites" element={<FavoritesPage />} /> 

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/products" element={<AdminProduct />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/inventory" element={<AdminInventory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;