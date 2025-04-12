import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";


import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import { Provider } from "react-redux";
import { store } from "./Redux/store";

// 🔥 Add this block to load theme immediately (no flash)
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
