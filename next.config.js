module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/glhfvn/**",
      },
      {
        protocol: "https",
        hostname: "s4.anilist.co",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["vietnamese"] } },
    ],
  },
};
