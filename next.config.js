const regenerateToken = process.env.NEXT_REGENERATE_TOKEN;
const imageDomain = process.env.NEXT_PUBLIC_SUPABASE_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    REGENERATE_TOKEN: regenerateToken
  },
  images: {
    remotePatterns: [
      {
        protocol: imageDomain.split('://')[0],
        hostname: imageDomain.split('://')[1]
      }
    ]
  }
};

module.exports = nextConfig;
