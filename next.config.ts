import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    // Match the layouts used by the site so small phones do not receive the
    // default 640px rendition for a 320–430px viewport.
    deviceSizes: [320, 360, 375, 390, 414, 430, 480, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
    qualities: [80, 82, 84, 88, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
