/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    FIREBASE: process.env.FIREBASE,
  },
};

module.exports = nextConfig;
