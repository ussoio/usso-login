import axios from "axios";

const createConfig = () => {
    if (process.env.NODE_ENV === "development") {
        return { baseURL: "https://sso.pixy.ir", timeout: 10000, withCredentials: true };
    } else {
        return { timeout: 10000, withCredentials: true };
    }
};

const configs = createConfig();

const api = axios.create(configs);

export default api;
