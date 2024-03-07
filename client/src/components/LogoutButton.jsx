import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
import "../App.css";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get("https://chat-interface-wysa.onrender.com/api/v1/users/logout")
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button
        className="chat-button"
        onClick={handleLogout}
        style={{ width: "130px" }}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
