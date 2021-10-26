import React from "react";
import "./Chat.css";

const Chat = ({ name, message, timeStamp, received, username }) => {
  //console.log(name, message, timeStamp, received);
  return (
    <div>
      <p className={name === username ? "reciver_message message" : "message"}>
        <span className="sendby">{name}</span>
        {message}
        <span className="time">{timeStamp}</span>
      </p>
    </div>
  );
};

export default Chat;
