/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["pbs.twimg.com"],
  },
  eslint: {
    // Turns off ESLint during builds becaues we do it in an
    // earlier CI step
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Turns off type checking during builds becaues we do it in an
    // earlier CI step
    ignoreBuildErrors: true,
  },
};
