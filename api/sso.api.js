import axios from "@/utils/axios";

export async function getConfig() {
    try {
        const res = await axios.get("/website/config");
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function checkUser() {
    const baseUrl = process.env.NODE_ENV === "development" ? "https://sso.rentamon.com" : "";

    try {
        const response = await fetch(`${baseUrl}/user`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
