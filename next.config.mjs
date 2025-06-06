/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/checkin',
        destination: 'http://localhost:38080/checkin.php',
      },
    ];
  },
};

export default nextConfig;