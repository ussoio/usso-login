import api from "@/utils/axios";
import data from "@/data/configs.json";

export async function getConfig() {
    try {
        const res = await api.get("/website/config");
        return res.data;
    } catch (error) {
        throw error;
    }
}
