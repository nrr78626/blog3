/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:"dummyimage.com"
            },
            {
                protocol:"http",
                hostname:"res.cloudinary.com"
            }
        ]
    }
};

export default nextConfig;
