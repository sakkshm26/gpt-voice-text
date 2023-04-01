import axios from "axios";
import JWT from "expo-jwt";

const token = JWT.encode({ foo: "bar" }, process.env.REACT_APP_JWT_SECRET_KEY);

const API = axios.create({ baseURL: "http://localhost:4000" });

API.interceptors.request.use((req) => {
  req.headers.authorization = `${token}`;
  return req;
});

export default API;
