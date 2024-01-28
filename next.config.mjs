/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    COGNITO_POOL_ID: process.env.COGNITO_POOL_ID,
    COGNITO_APP_CLIENT_ID: process.env.COGNITO_APP_CLIENT_ID,
  },
};

export default nextConfig;
