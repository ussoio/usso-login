"use client";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

const cache = createCache({
    key: "muirtl",
    prepend: true,
    stylisPlugins: [prefixer, rtlPlugin],
});

export default function EmotionCache({ children }) {
    return <CacheProvider value={cache}>{children}</CacheProvider>;
}
