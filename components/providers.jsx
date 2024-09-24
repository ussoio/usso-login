"use client";

import { LoadingButton } from "@mui/lab";
import { useSearchParams } from "next/navigation";

export default function Providers({ providers }) {
    const searchParams = useSearchParams();
    const callback = searchParams.get("callback");

    return (
        <div className="space-y-3">
            {providers.map((provider, index) => (
                <LoadingButton
                    key={index}
                    fullWidth
                    variant="outlined"
                    endIcon={
                        <img src={provider.icon} alt={`${provider.text} icon`} className="w-6 h-6 object-contain" />
                    }
                    className="justify-center gap-4 normal-case py-2 text-base font-normal"
                    href={`${provider.url}?callback=${callback}`}
                >
                    {provider.text}
                </LoadingButton>
            ))}
        </div>
    );
}
