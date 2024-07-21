/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "dummyimage.com"
            },
            {
                protocol: "http",
                hostname: "res.cloudinary.com"
            },
            {
                protocol: "http",
                hostname: "miro.medium.com"
            }
        ]
    }
};

export default nextConfig;
