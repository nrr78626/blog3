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
                protocol: "https",
                hostname: "miro.medium.com"
            },
            {
                protocol:"https",
                hostname:"img.freepik.com"
            },
            {
                protocol:"https",
                hostname:"www.searchenginejournal.com"
            }
        ]
    }
};

export default nextConfig;
