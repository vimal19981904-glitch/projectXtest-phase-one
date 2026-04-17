/** @type {import('next').NextConfig} */
const nextConfig = {
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
