"use client";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const cache = createCache({
    key: "css",
    prepend: true,
});

export default function EmotionCache({ children }) {
    return <CacheProvider value={cache}>{children}</CacheProvider>;
}
