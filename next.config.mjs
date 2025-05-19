/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@refinedev/antd"],
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${process.env.NEXT_PUBLIC_AUTH_API}/:path*`,
      },
      {
        source: "/api/graphql/:path*",
        destination: `${process.env.NEXT_PUBLIC_HASURA_API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
