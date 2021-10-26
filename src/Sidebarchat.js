import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import "./Sidebarchat.css";
import { Link } from "react-router-dom";

const Sidebarchat = ({ room }) => {
  const [seed, setSeed] = useState("");
  const roomid = room._id;
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <Link to={`/room/${roomid}`}>
      <div className="sidebarchat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarchat_info">
          <h2>{room.name}</h2>
          <p>Click to enter</p>
        </div>
      </div>
    </Link>
  );
};

export default Sidebarchat;
