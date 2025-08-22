/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  webpack: (config, { isServer }) => {
    // Handle client-side polyfills and fallbacks
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }

    // Exclude undici and other Node.js specific modules from client bundle
    config.externals = config.externals || [];
    if (!isServer) {
      config.externals.push({
        undici: 'commonjs undici',
        'node:crypto': 'commonjs crypto',
        'node:fs': 'commonjs fs',
        'node:stream': 'commonjs stream',
      });
    }

    // Handle ES modules and prevent parsing issues
    config.module.rules.push({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false,
      },
    });

    // Handle problematic modules by aliasing them to false
    config.resolve.alias = {
      ...config.resolve.alias,
      'undici': false,
      '@firebase/auth/internal': false,
    };

    return config;
  },
  experimental: {
    serverComponentsExternalPackages: [
      'firebase',
      '@firebase/auth', 
      '@firebase/firestore',
      '@firebase/storage',
      'undici'
    ],
  },
};

export default nextConfig;
