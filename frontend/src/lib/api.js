import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://born-in-flight.onrender.com";
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

export const adminApi = (token) =>
  axios.create({
    baseURL: API,
    headers: { "X-Admin-Token": token },
  });
