import api from "@/utils/axios";

const data = {
    branding: {
        logo: "https://app.pixiee.io/public/logo/png/logotype.png",
        favicon: "https://cdn.jsdelivr.net/gh/0x1un/CDN/img/favicon.ico",
        title: "پیکسی",
        description: "به پیکسی خوش آمدید.",
        shape: {
            borderRadius: 12,
        },
        palette: {
            primary: {
                main: "#f44336",
            },
            secondary: {
                main: "#e91e63",
            },
            text: {
                main: "#000000",
            },
        },
    },
    legal: {
        privacy: "https://example.com/privacy",
        terms: "https://example.com/terms",
    },
    methods: [
        {
            type: "provider",
            text: "Sign in with Google",
            icon: "https://google.com/favicon",
            color: "red",
            url: "/auth/google",
        },
        {
            type: "provider",
            text: "Sign in with GitHub",
            icon: "https://github.com/favicon",
            color: "black",
            url: "/auth/github",
        },
        {
            type: "credential",
            options: [
                {
                    identifier: "username",
                    placeholder: "username",
                    description: "Enter your username",
                    regex: "^[a-zA-Z0-9_]{3,16}$",
                    secrets: [
                        {
                            type: "password",
                            placeholder: "password",
                            description: "Enter your password",
                            regex: "^[a-zA-Z0-9_]{6,16}$",
                        },
                    ],
                },
                {
                    identifier: "email",
                    placeholder: "email",
                    description: "Enter your email",
                    regex: "^\\S+@\\S+\\.\\S+$",
                    secrets: [
                        {
                            type: "password",
                            placeholder: "password",
                            description: "Enter your password",
                        },
                        {
                            type: "otp",
                            placeholder: "otp",
                            description: "Enter the OTP",
                        },
                        {
                            type: "link",
                            placeholder: "link",
                            description: "Enter the login link",
                        },
                    ],
                },
                {
                    identifier: "phone",
                    placeholder: "phone",
                    description: "Enter your phone number",
                    regex: "^[0-9]{10,12}$",
                    secrets: [
                        {
                            type: "otp",
                            placeholder: "otp",
                            description: "Enter the OTP",
                        },
                        {
                            type: "password",
                            placeholder: "password",
                            description: "Enter your password",
                        },
                    ],
                },
            ],
        },
    ],
    captcha_api: "/challenge",
    localization: {
        languages: ["en", "fa"],
        default: "en",
    },
};

export async function getConfig() {
    try {
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        const res = await api.get("/website/config");
        console.log(data);
        return res.data;
    } catch (error) {
        throw error;
    }
}
