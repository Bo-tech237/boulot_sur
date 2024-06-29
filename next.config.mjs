/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: { ignoreBuildErrors: true },
    images: {
        remotePatterns: [
            {
                hostname: 'lh3.googleusercontent.com',
            },
        ],
    },
};

export default nextConfig;