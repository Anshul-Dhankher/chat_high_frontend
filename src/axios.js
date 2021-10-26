import axios from "axios";

const instance = axios.create({
  baseURL: "https://chathighback-end.herokuapp.com/",
});

export default instance;
