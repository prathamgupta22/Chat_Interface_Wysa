import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://chat-interface-wysa.onrender.com/api/v1/users/resetPassword/" +
          token,
        {
          password: password,
        }
      )
      .then((response) => {
        if (response.data.status) {
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
        <h2>Reset Password</h2>
        <label htmlFor="password">Password :</label>
        <input
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Reset</button>
      </form>
    </div>
  );
};

export default ResetPassword;
