"use client";

import { ToastContainer } from "react-toastify";

export default function ToastProvider({ children }) {
    return (
        <>
            <ToastContainer rtl limit={1} />
            <div>{children}</div>
        </>
    );
}
