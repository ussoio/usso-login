"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Box, Divider, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import { useQuery } from "@tanstack/react-query";
import { getConfig, checkUser } from "@/api/sso.api";
import { useCookies } from "react-cookie";
import Loading from "./loading";

import Steps from "@/components/steps";
import Branding from "@/components/branding";
import Providers from "@/components/providers";
import Legals from "@/components/legals";
import { isEmpty, isNull } from "lodash";

export default function Page() {
    const searchParams = useSearchParams();
    const [cookies] = useCookies(["usso_refresh_available"]);
    const [callback, setCallback] = useState(searchParams.get("callback"));
    const [origin, setOrigin] = useState(searchParams.get("origin"));

    const getBaseDomain = () => {
        const url = new URL(window.location.href);
        const baseDomain = url.hostname.split(".").slice(-2).join(".");
        return `https://${baseDomain}`;
    };

    const configs = useQuery({
        queryFn: getConfig,
    });

    const user = useQuery({
        queryFn: checkUser,
        enabled: !isEmpty(configs.data),
    });

    useEffect(() => {
        if (isEmpty(cookies["usso_refresh_available"])) {
            window.location.href = getBaseDomain();
        }
    }, []);

    if (configs.isLoading || user.isLoading) {
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
                <Box className="bg-white p-8 rounded-lg w-full max-w-80 shadow-none md:max-w-sm md:shadow-md">
                    <Branding data={configs.data?.branding} />

                    <Steps data={credential} callback={configs.data.default_redirect_url || callback}></Steps>

                    {!isEmpty(providers) && <Divider className="my-6">یا</Divider>}

                    <Providers providers={providers} callback={configs.data.default_redirect_url || callback} />
                </Box>

                {!isEmpty(configs.data?.legal) && <Legals data={configs.data?.legal}></Legals>}
            </div>
        </ThemeProvider>
    );
}
