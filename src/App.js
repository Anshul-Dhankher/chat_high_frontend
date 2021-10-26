import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./sidebar";
import Chatbody from "./chatbody";
import Header from "./Header";
import Pusher from "pusher-js";
import axios from "./axios";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState(null);

  //fetch messages
  useEffect(() => {
    axios.get("/messages/sync").then((res) => {
      //console.log(res.data);
      setMessages(res.data);
    });
  }, []);

  //whenever we post a message pusher changes the messages
  useEffect(() => {
    const pusher = new Pusher("908f2c6e588790ab9537", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (data) => {
      setMessages([...messages, data]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  //rooms fetcher
  useEffect(() => {
    axios.get("/rooms/sync").then((res) => {
      setRooms(res.data);
    });
  }, []);

  //pusher for rooms inserted
  useEffect(() => {
    const pusher = new Pusher("908f2c6e588790ab9537", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("rooms");
    channel.bind("inserted", (data) => {
      setRooms([...rooms, data]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [rooms]);

  return (
    <Router>
      {user ? (
        <Switch>
          <Route exact path="/">
            <Header />
            <div className="app">
              <div className="app_body">
                <Sidebar rooms={rooms} user={user} />
              </div>
            </div>
          </Route>
          <Route path="/room/:roomid">
            <Header />
            <div className="app">
              <div className="app_body">
                <Sidebar rooms={rooms} user={user} setUser={setUser} />
                <Chatbody messages={messages} user={user} />
              </div>
            </div>
          </Route>
        </Switch>
      ) : (
        <Login setUser={setUser} />
      )}
    </Router>
  );
}

export default App;
