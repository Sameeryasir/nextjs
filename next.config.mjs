/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/checkin',
        destination: 'http://localhost:38080/checkin.php',
      },
       {
        source: '/checkin-solution2',
        destination: 'http://localhost:9000/checkin.php',
      },
      // New rewrite rule for the customer exchange API
      {
        source: '/api/customer-exchange', // This is the path your Next.js app will request
        destination: 'http://localhost:38080/general/customer/exchange.php', // This is where Next.js will proxy the request
      },
      // In your next.config.mjs file, inside the return array of the rewrites function:
      {
        source: '/api/region-exchange',
        destination: 'http://localhost:38080/general/region/exchange.php',
      },
      {
        source: '/api/register-customer',
        destination: 'http://localhost:38080/general/customer/cstregister.php',
      },
      {
        source: '/api/compensating-exchange', // A new local path for this specific API
        destination: 'http://localhost:38080/general/Customer/exchange.php', // The exact external API URL
      },
      {
        source: '/api/dictionary-exchange',
        destination: 'http://localhost:38080/general/dictionary/exchange.php',
      },
      // In your next.config.mjs file, inside the return array of the rewrites function:
      {
        source: '/api/dictionary-exchange',
        destination: 'http://localhost:38080/general/dictionary/exchange.php',
      },
      {
        source: '/api/free-issue-list', // The path your Next.js app will request
        destination: 'http://localhost:38080/general/Customer/exchange.php', // The actual backend API endpoint
      },
      {
        source: '/api/vendor-accounts', // The path your Next.js app will request
        destination: 'http://localhost:38080/general/finance/exchange.php', // The actual backend API endpoint
      },
      {
        source: '/api/sys-parameters',
        destination: 'http://localhost:38080/general/sys/parameters.php',
      },
      {
        source: '/api/vendor-sessions', // The path your Next.js app will request
        destination: 'http://localhost:38080/general/finance/exchange.php', // The actual backend API endpoint
      },
      {
        source: '/api/meter-model', // The path your Next.js app will request
        destination: 'http://localhost:38080/general/model/exchange.php', // The actual backend API endpoint
      },
      {
        source: '/api/tariffs', // The path your Next.js app will request
        destination: 'http://localhost:38080/general/Tariff/exchange.php', // The actual backend API endpoint
      },
      {
        source: '/api/prices', // The path your Next.js app will request
        destination: 'http://localhost:38080/general/price/exchange.php', // The actual backend API endpoint
      },
      {
        source: '/api/roles', // The path your Next.js app will request
        destination: 'http://localhost:38080/general/sys/utility/exchange.php', // The actual backend API endpoint
      },
      {
        source: '/api/languages', // The path your Next.js app will request
        destination: 'http://localhost:38080/general/language/exchange.php', // The actual backend API endpoint
      },
      {
        source: '/api/warehouse', // The path your Next.js app will request
        destination: 'http://localhost:38080/general/warehouse/exchange.php', // The actual backend API endpoint
      },
      {
        source: '/api/arrear-projects', // The path your Next.js app will request
        destination: 'http://localhost:38080/general/arrear/exchange.php', // The actual backend API endpoint
      },
      {
        source: '/api/sge-reports',
        destination: 'http://localhost:38080/general/sge/reports/exchange.php',
      },
      // In your next.config.mjs file, inside the return array of the rewrites function:
      {
        source: '/api/desktop-main',
        destination: 'http://localhost:38080/general/desktop/main.php',
      },
      {
        source: '/api/branches', // The path your Next.js app will request
        destination: 'http://localhost:38080/general/branch/exchange.php', // The actual backend API endpoint
      },
      {
        source: '/api/public-exchange', // The path your Next.js app will request
        destination: 'http://localhost:38080/general/public/exchange.php', // The actual backend API endpoint
      },
      {
        source: '/api/register-info', // This is the path your Next.js app will request
        destination: 'http://localhost:38080/general/sys/register.php', // The actual backend API endpoint
      },
      {
        source: '/api/utility-reginfo', // New path for this page's API
        destination: 'http://localhost:38080/general/sys/utility/reginfo.php', // The actual API
      },
      {
        source: '/api/utility-exchange', // New path for this page's API
        destination: 'http://localhost:38080/general/sys/utility/exchange.php', // The actual API
      },
      {
        source: '/api/branches', // The path your Next.js app will request
        destination: 'http://localhost:38080/general/branch/exchange.php', // The actual backend API endpoint
      },
      {
        source: '/api/navigator-header',
        destination: 'http://localhost:38080/general/navigator/header.php',
      },
      {
        source: '/api/logout',
        destination: 'http://localhost:38080/general/navigator/exchange.php?ACTION=1',
      },
    ];
  },
};

export default nextConfig;