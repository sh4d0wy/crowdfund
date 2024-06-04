/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'img.freepik.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'www.google.com',
            port: '',
          },
        ],
      },
};

export default nextConfig;
