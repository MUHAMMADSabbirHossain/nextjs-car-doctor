/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ibb.co',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: '"lh3.googleusercontent.com',
                // hostname: '*',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/**'
            }
        ]
    }
};

export default nextConfig;
