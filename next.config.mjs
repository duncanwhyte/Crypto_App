/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "**",
                protocol: "https",
        }
        ]
    },
    reactStrictMode: false
};

export default nextConfig;
