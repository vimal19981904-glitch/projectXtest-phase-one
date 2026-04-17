/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/job-support',
        destination: '/consulting-firm-support',
        permanent: true,
      },
      {
        source: '/on-job-support',
        destination: '/consulting-firm-support',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
