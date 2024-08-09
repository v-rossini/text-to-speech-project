/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        ELEVEN_LABS_API_KEY: process.env.ELEVEN_LABS_API_KEY,
        BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN
      }
}

module.exports = nextConfig
