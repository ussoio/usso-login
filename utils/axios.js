import axios from "axios";

export const baseUrl = process.env.NODE_ENV === "development" ? "https://sso.rentamon.com" : "";

const createConfig = () => {
    if (process.env.NODE_ENV === "development") {
        return { baseURL: baseUrl, timeout: 10000, withCredentials: true };
    } else {
        return { timeout: 10000, withCredentials: true };
    }
};

const configs = createConfig();

const api = axios.create(configs);

export default api;
