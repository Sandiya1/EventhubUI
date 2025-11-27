import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.vite_api_url,
});

export default api;
