import axios from "axios";

const api = axios.create({
    baseURL: "https://sso.pixiee.io/",
    timeout: 10000,
});

export default api;
