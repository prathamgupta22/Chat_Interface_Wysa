import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

// axios.defaults.baseURL = "https://chat-interface-wysa.onrender.com";

axios.defaults.withCredentials = true;
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Router>
      <App />
    </Router>
  </>
);
