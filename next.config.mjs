/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "rukminim2.flixcart.com",
                port: '',
                pathname: "/image/**"
            },{
                protocol: "https",
                hostname: "ecommerce-test-buckettt.s3.ap-south-1.amazonaws.com",
                port: '',
                pathname: "/**"
            }
        ]
    }
};

export default nextConfig;
