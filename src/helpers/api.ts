import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://restcountries.com/v3.1", // Set your base URL here
});

export default axiosInstance;
