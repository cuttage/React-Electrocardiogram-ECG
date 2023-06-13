/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@arction/lcjs'])

module.exports = withTM({
  // Other Next.js configurations
  reactStrictMode: false,
  output: 'standalone',
  webpack(config) {
    config.resolve.extensions.push('.ts', '.tsx')
    return config
  },
})
