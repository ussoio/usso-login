import axios from "axios";

const createConfig = () => {
    if (process.env.NODE_ENV === "development") {
        return { baseURL: "https://sso.pixiee.io/", timeout: 10000 };
    } else {
        return { timeout: 10000 };
    }
};

const configs = createConfig();

const api = axios.create(configs);

export default api;
