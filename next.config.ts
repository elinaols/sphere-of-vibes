import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Allow external image from Spotifys domains (Enables loading optimized images)
    domains: ['i.scdn.co', 'mosaic.scdn.co']
  }
};

export default nextConfig;
