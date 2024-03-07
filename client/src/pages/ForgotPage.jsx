import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const ForgotPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://chat-interface-wysa.onrender.com/api/v1/users/forgotPassword",
        {
          email,
        }
      )
      .then((response) => {
        if (response.data.status) {
          alert("check your mail for reset password link");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          placeholder="Enter your Mail..."
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ForgotPage;
