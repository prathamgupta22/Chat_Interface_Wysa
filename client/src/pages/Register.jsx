import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .post(
          "https://chat-interface-wysa.onrender.com/api/v1/users/register",
          {
            username,
            email,
            password,
          }
        )
        .then((response) => {
          if (response.data.status) {
            navigate("/login");
          }
        });
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };
  return (
    <div className="sign-up-container">
      <h1>Sign Up</h1>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username :</label>
        <input
          type="text"
          placeholder="Username..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <label htmlFor="email">Email :</label>
        <input
          type="email"
          placeholder="Enter your Mail..."
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label htmlFor="password">Password :</label>
        <input
          type="password"
          placeholder="Enter your Password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
