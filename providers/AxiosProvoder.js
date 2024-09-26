"use client";

import api from "@/utils/axios";
import { toast } from "react-toastify";

export default function AxiosProvider({ children }) {
    api.interceptors.response.use(
        function (response) {
            // console.log(response);
            if (response.data) {
                toast.success(response.data.message, {
                    position: "top-right",
                });
            }

            return response;
        },
        function (error) {
            console.log(error);
            if (error.response.data) {
                toast.error(error.response.data.message, {
                    position: "top-right",
                });
            }

            return Promise.reject(error);
        }
    );

    return <>{children}</>;
}
