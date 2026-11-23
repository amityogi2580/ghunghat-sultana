import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext"; // <-- Import
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <WishlistProvider>
        {" "}
        {/* <-- Wrap */}
        <App />
      </WishlistProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
