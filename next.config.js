const regenerateToken = process.env.NEXT_REGENERATE_TOKEN;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    REGENERATE_TOKEN: regenerateToken
  }
};

module.exports = nextConfig;
