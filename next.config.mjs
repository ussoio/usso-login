/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
};

export default nextConfig;
