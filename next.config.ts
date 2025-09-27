import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here 

    Contoh konfigurasi berikut hanya akan mengizinkan gambar dari bucket AWS S3 tertentu:
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/my-bucket/**',
        search: '',
      },
    ],
  },
  */
};

export default nextConfig;
