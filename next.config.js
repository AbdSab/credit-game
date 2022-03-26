/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodburl: "mongodb+srv://admin:totohello@cluster.lj5lt.mongodb.net/brahim-games?retryWrites=true&w=majority",
  }
}

module.exports = nextConfig
