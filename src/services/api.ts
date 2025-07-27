// services/api.ts
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3950/api", // Asegúrate de que coincida con tu backend
  withCredentials: true,
});

export default instance;
