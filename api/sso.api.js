import axios from "@/utils/axios";
import { baseUrl } from "@/utils/axios";

export async function getConfig() {
    try {
        const res = await axios.get("/website/config");
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function refreshToken() {
    const res = await axios.post(`${baseUrl}/auth/refresh`);
    return res.data;
}
