import api from "@/utils/axios";

export async function getConfig() {
    try {
        const res = await api.get("/website/config");
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function checkUser() {
    try {
        const res = await api.get("/user");
        return res.data;
    } catch (error) {
        throw error;
    }
}
