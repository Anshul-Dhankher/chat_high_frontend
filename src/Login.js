import React from "react";
import "./Login.css";
import logo from "./logo.png";
import { Button } from "@mui/material";
import { auth, provider } from "./firebase.js";
import { useHistory } from "react-router-dom";

const Login = ({ setUser }) => {
  const signin = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.user);
        setUser(result.user);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="login">
      <div className="login_container">
        <img src={logo} alt="" />
        <div className="login_text">
          <h1>Login to Chat High</h1>
        </div>
        <Button type="submit" onClick={signin}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
