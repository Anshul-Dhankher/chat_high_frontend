import React from "react";
import logo from "./logo.png";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="logo_heading">
        <img className="logo" src={logo} alt="" />
        <h1>CHAT HIGH</h1>
      </div>
    </div>
  );
};

export default Header;
