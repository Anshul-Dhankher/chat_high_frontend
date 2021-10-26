import React, { useState, useEffect } from "react";
import "./chatbody.css";
import { Avatar, IconButton } from "@mui/material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SendIcon from "@mui/icons-material/Send";
import Chat from "./Chat";
import axios from "./axios";
import { useParams } from "react-router-dom";
function Chatbody({ messages, user }) {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomMessages, setRoomMessages] = useState([]);
  const { roomid } = useParams();

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomid]);

  useEffect(() => {
    console.log(roomid);
    if (roomid) {
      //go and fire a get request in my db to get name corresponding to my roomid
      axios.get("/getroomname", { params: { roomid: roomid } }).then((res) => {
        const rmn = res.data.name;
        console.log(rmn);
        setRoomName(rmn);
      });
    }
  }, [roomid]);

  useEffect(() => {
    axios
      .get("/getroommessages", { params: { roomid: roomid } })
      .then((res) => {
        const mess = res.data;
        console.log(mess);
        setRoomMessages(mess);
      });
  }, [roomid, messages]);

  const handleSubmit = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    setInput(e.target.value);
    axios.post("/messages/new", {
      message: input,
      name: user.displayName,
      timeStamp: Date(),
      received: false,
      roomID: roomid,
    });
    setInput("");
  };
  return (
    <div className="Chatbody">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat_header_info">
          <h2>{roomName}</h2>
          <p>
            {`last seen at 
             ${
               roomMessages.length != 0 && roomMessages
                 ? roomMessages[roomMessages.length - 1].timeStamp
                 : " ..."
             }`}
          </p>
        </div>
      </div>
      <div className="chatfield">
        {roomMessages.map(({ name, message, timeStamp, received, _id }) => {
          //console.log(name, message, timeStamp, received);
          return (
            <Chat
              key={_id}
              name={name}
              message={message}
              timeStamp={timeStamp}
              received={received}
              username={user.displayName}
            />
          );
        })}
      </div>
      <div className="chat_footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <form onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="your message"
          />
          <IconButton onClick={handleSubmit}>
            <SendIcon />
          </IconButton>
        </form>
      </div>
    </div>
  );
}

export default Chatbody;
