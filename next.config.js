const imageDomain = process.env.NEXT_PUBLIC_SUPABASE_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
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
