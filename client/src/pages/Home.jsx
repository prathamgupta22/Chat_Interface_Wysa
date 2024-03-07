import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-message">Welcome to Wysa AI Chat App!</div>
      </div>
      <button>
        <Link to="/chat">CHAT PAGE</Link>
      </button>
      <br />
      <br />
      <button>Logout</button>
    </div>
  );
};

export default Home;
