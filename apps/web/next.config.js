const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value:
      `default-src 'none';` +
      `base-uri 'self';` +
      `child-src 'self' app.netlify.com https://www.google.com;` +
      `form-action 'none';` +
      `frame-ancestors 'none';` +
      `img-src 'self' images.prismic.io data:;` +
      `media-src 'self';` +
      `object-src 'none';` +
      `script-src 'self' app.netlify.com netlify-cdp-loader.netlify.app https://www.google.com/recaptcha/ https://www.gstatic.com ${
        process.env.NODE_ENV === "development" ? `'unsafe-eval'` : ""
      };` +
      `style-src 'self' fonts.googleapis.com 'unsafe-inline';` +
      `font-src fonts.gstatic.com;` +
      `connect-src 'self' *.ocean.jellyfishsdk.com changi.dfi.team yiautp9xyt.ap-southeast-1.awsapprunner.com ${
        process.env.NODE_ENV === "development"
          ? `localhost:* 127.0.0.1:* ws://localhost:3000/_next/webpack-hmr base-goerli.blockscout.com eth-goerli.blockscout.com yiautp9xyt.ap-southeast-1.awsapprunner.com`
          : ""
      };`,
  },
  {
    key: "Referrer-Policy",
    value: "same-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    deviceSizes: [360, 768, 1440, 1920, 2048, 3840],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
