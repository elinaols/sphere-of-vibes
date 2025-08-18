import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Allow external image from Spotifys domains (Enables loading optimized images)
    domains: ['i.scdn.co', 'mosaic.scdn.co', 'image-cdn-ak.spotifycdn.com', 'image-cdn-ck-spotifycdn.com', 'image-cdn-bk-spotifycdn.com']
  }
};

export default nextConfig;
