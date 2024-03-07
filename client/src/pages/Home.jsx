import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
const Home = () => {
  return (
    <div className="home-container">
      <div className="welcome-text">Welcome to Wysa AI Chat App!</div>
      <button className="chat-button">
        <Link to="/chat" className="link">
          CHAT PAGE
        </Link>
      </button>
      <div className="logout-container">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Home;
