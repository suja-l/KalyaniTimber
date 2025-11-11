// src/main.jsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { StoreProvider } from "./context/StoreContext"; // <-- 1. IMPORT

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoreProvider> {/* <-- 2. WRAP YOUR APP */}
      <App />
    </StoreProvider>
  </StrictMode>
);