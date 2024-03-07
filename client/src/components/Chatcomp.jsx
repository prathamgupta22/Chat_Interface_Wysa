import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import MessageBubble from "./MessageBubble";
import "./ChatComponent.css";
import UserMessageBubble from "./UserMessageBubble";

const Chatcomp = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const socket = io("https://chat-interface-wysa.onrender.com/");

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("api/v1/users/verify").then((res) => {
      if (res.data.status) {
      } else {
        navigate("/");
      }
    });
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });
    socket.on("welcome", (message) => {
      console.log();
      message;

      setMessages((prevMessages) => [...prevMessages, message]);
    });
    socket.on("userText", (recieved) => {
      setMessages((prev) => [...prev, recieved]);
    });
    return () => {
      socket.disconnect();
    };
  }, [setMessages, navigate]);

  const handleSend = () => {
    if (inputMessage.trim() !== "") {
      socket.emit("userMessage", inputMessage);
    }
    setUserMessage((prev) => [...prev, inputMessage]);
    setInputMessage("");
  };
  const userWala = ["hey", "there"];

  return (
    <>
      <div className="container">
        <div className="chat-container">
          {messages.map((message, index) => (
            <MessageBubble message={message} />
          ))}
        </div>
        <div className="user-message">
          {userMessage.map((message, index) => (
            <UserMessageBubble message={message} />
          ))}
        </div>
      </div>
      <div className="inputMessage">
        <input
          type="text"
          placeholder="Write messsage here..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </>
  );
};

export default Chatcomp;
