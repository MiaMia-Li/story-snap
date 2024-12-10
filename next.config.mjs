/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig = withNextIntl({
  images: {
    domains: [
      "github.com",
      "lh3.googleusercontent.com",
      "cdn.jsdelivr.net",
      "yggd8boz08mj0dzm.public.blob.vercel-storage.com",
      "replicate.delivery",
      "replicate.com",
      "story-snap.vercel.app",
      "storysnap.support-0bf.workers.dev",
    ],
  },
  /* config options here */
});

export default nextConfig;
