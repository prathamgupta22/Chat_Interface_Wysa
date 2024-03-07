import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/users/login", {
        email,
        password,
      });

      if (response.data.status) {
        navigate("/chat");
      } else {
        console.log("Login failed:", response.data.message);
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="sign-up-container">
      <h1>Login</h1>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          placeholder="Enter your Mail..."
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password :</label>
        <input
          type="password"
          placeholder="Enter your Password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>

        <Link to="/forgotPassword">Forgot Password ?</Link>
      </form>
    </div>
  );
};

export default Login;
