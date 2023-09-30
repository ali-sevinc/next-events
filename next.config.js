/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    FIREBASE: process.env.FIREBASE,
    MONGO: process.env.MONGO,
  },
};

module.exports = nextConfig;
