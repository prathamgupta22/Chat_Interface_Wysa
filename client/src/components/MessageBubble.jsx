import React from "react";
import avatar from "../assets/aiImg.jpg";

const MessageBubble = ({ message }) => {
  return (
    <div className="bubble">
      <img src={avatar} alt="avatar" />
      {message}
    </div>
  );
};

export default MessageBubble;
