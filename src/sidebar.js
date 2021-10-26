import { useState } from "react";
import "./sidebar.css";
import rick from "./rick.png";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton, Avatar } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import Sidebarchat from "./Sidebarchat";
import axios from "./axios";
import { auth } from "./firebase";

const Sidebar = ({ rooms, user, setUser }) => {
  const logout = () => {
    auth.signOut().then(() => {
      setUser(null);
    });
  };
  const handleclick = () => {
    const roomName = prompt("Enter your room name");
    //console.log(roomName);
    // go and make a post request of this name
    if (roomName) {
      axios.post("/rooms/new", {
        name: roomName,
      });
    }
  };
  return (
    <div className="Sidebar">
      <div className="sidebar_header">
        <div className="sidebar_headerleft">
          <Avatar src={user ? user.photoURL : rick} />
        </div>
        <div className="sidebar_headerright">
          <h2>
            <span>Welcome</span>
            <span>{user ? user.displayName : "GUEST"}!!!</span>
          </h2>
          <IconButton onClick={handleclick}>
            <ChatIcon />
          </IconButton>
          <IconButton onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchcontainer">
          <SearchOutlined />
          <input placeholder="Search or start a new chat" type="text" />
        </div>
      </div>
      <div className="sidebar_chats">
        {rooms.map((room) => {
          return <Sidebarchat key={room._id} room={room} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
