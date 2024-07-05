import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      // closeOnClick
      rtl={false}
      // pauseOnFocusLoss
      // draggable
      pauseOnHover
      theme="light"
    />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
