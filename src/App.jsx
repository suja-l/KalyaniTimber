// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Homepage from "./Pages/Homepage/homepage";
import AdminPage from "./Pages/Adminpage/AdminPage.jsx";
import AdminProduct from "./Pages/Adminpage/AdminProduct.jsx";
import AdminOrders from "./Pages/Adminpage/AdminOrders.jsx"; // <-- ADDED

import "./index.css";

function App() {
  return (
    <Router>
      <div className="">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/products" element={<AdminProduct />} />
          <Route path="/admin/orders" element={<AdminOrders />} /> {/* <-- ADDED */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;