"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { Box, Divider, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import { useQuery } from "@tanstack/react-query";
import { getConfig, refreshToken } from "@/api/sso.api";
import { useCookies } from "react-cookie";
import Loading from "./loading";

import Steps from "@/components/steps";
import Branding from "@/components/branding";
import Providers from "@/components/providers";
import Legals from "@/components/legals";
import { isEmpty } from "lodash";
import { validateRedirectUrl } from "@/utils/url";
import { loadFontFromObject } from "@/utils/loadFont";

export default function Page() {
    const searchParams = useSearchParams();
    const rawCallback = searchParams.get("callback");
    const [cookies] = useCookies(["usso_refresh_available"]);

    const baseDomain = () => {
        const url = new URL(window.location.href);
        const baseDomain = url.hostname.split(".").slice(-2).join(".");
        return `https://${baseDomain}`;
    };

    // Get allowed domains from config or use a default list
    const getAllowedDomains = (config) => {
        const defaultDomains = [window.location.hostname];
        return config?.allowed_domains || defaultDomains;
    };

    const refresh = useQuery({
        queryKey: ["refresh"],
        queryFn: refreshToken,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        retry: false,
    });

    const configs = useQuery({
        queryKey: ["configs"],
        queryFn: getConfig,
    });

    useEffect(() => {
        if (refresh.isSuccess && configs.isSuccess) {
            if (cookies.usso_refresh_available) {
                const allowedDomains = getAllowedDomains(configs.data);
                const validatedCallback = validateRedirectUrl(rawCallback, allowedDomains);
                const redirectUrl = validatedCallback || configs.data?.default_redirect_url || baseDomain();

                window.location.href = redirectUrl;
            }
        }

        if (configs.isSuccess) {
            const fontList = configs.data?.branding?.fontList;
            if (fontList && Array.isArray(fontList) && fontList.length > 0) {
                fontList.forEach(async (font) => {
                    try {
                        await loadFontFromObject(font);
                        console.log(`Font ${font.name} loaded successfully`);
                    } catch (error) {
                        console.error(`Failed to load font ${font.name}:`, error);
                    }
                });
            }
        }
    }, [refresh.isSuccess, configs.isSuccess, cookies.usso_refresh_available]);

    if (configs.isLoading || refresh.isLoading) {
        return <Loading></Loading>;
    }

    const themeConfig = createTheme({
        cssVariables: true,
        direction: "rtl",
        typography: {
            ...configs.data?.branding?.typography,
        },
        shape: {
            ...configs.data?.branding?.shape,
        },
        palette: {
            ...configs.data?.branding?.palette,
        },
    });

    const credential = configs.data?.methods?.filter((method) => method.type == "credential")[0];
    const providers = configs.data?.methods?.filter((method) => method.type == "provider");

    return (
        <ThemeProvider theme={themeConfig}>
            <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-50">
                <Box className="bg-white p-8 rounded-lg w-full max-w-80 shadow-none md:max-w-sm md:shadow-md relative">
                    <Branding data={configs.data?.branding} />

                    <Steps
                        data={credential}
                        callback={rawCallback || configs.data?.default_redirect_url || baseDomain()}
                    ></Steps>

                    {!isEmpty(providers) && <Divider className="my-6">یا</Divider>}

                    <Providers
                        providers={providers}
                        callback={rawCallback || configs.data?.default_redirect_url || baseDomain()}
                    />
                </Box>

                {!isEmpty(configs.data?.legal) && <Legals data={configs.data?.legal}></Legals>}
            </div>
        </ThemeProvider>
    );
}
