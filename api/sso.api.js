import api from "@/utils/axios";
import data from "@/data/configs.json";

export async function getConfig() {
    try {
        const res = await api.get("/website/config");
        return res.data;
    } catch (error) {
        throw error;
    } finally {
        if (process.env.NODE_ENV === "development") {
            console.log("Running in development mode");
            return data;
        }
    }
}
