/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'mrqzlmkdhzwvbpljikjz.supabase.co',
            },
            {
                protocol: 'https',
                hostname: 'api.dicebear.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.brandfetch.io',
            },
        ],
    },
    ...(process.env.NODE_ENV === 'production' ? { output: 'export', trailingSlash: true } : {}),

    typescript: {
        ignoreBuildErrors: true,
    },

};

export default nextConfig;
