import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve('.'),
    };
    return config;
  },
  images: {
    domains: ['images.unsplash.com']
  }
};

export default nextConfig;
