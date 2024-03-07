import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chatcomp from "./components/Chatcomp";
import ForgotPage from "./pages/ForgotPage";
import ResetPassword from "./components/ResetPassword";
import Trychatpage from "./pages/TryChat";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Chatcomp />} />
        <Route path="/forgotPassword" element={<ForgotPage />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />

        <Route path="/trychat" element={<Trychatpage />} />
      </Routes>
    </>
  );
};

export default App;
