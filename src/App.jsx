// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Homepage from "./Pages/Homepage/homepage";
import AdminPage from "./Pages/Adminpage/AdminPage.jsx";
import AdminProduct from "./Pages/Adminpage/AdminProduct.jsx";
import AdminOrders from "./Pages/Adminpage/AdminOrders.jsx";
import ProductListingPage from "./Pages/ProductsPage/ProductListingPage.jsx";
import ProductDetailPage from "./Pages/ProductsPage/ProductDetailPage.jsx";
import CartPage from "./Pages/CartPage/CartPage.jsx"; // <-- ADDED
import FavoritesPage from "./Pages/FavoritesPage/FavoritesPage.jsx"; // <-- ADDED

import "./index.css";

function App() {
  return (
    <Router>
      <div className="">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} /> {/* <-- ADDED */}
          <Route path="/favorites" element={<FavoritesPage />} /> {/* <-- ADDED */}

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/products" element={<AdminProduct />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;