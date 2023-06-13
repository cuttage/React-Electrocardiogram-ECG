/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@arction/lcjs'])

module.exports = withTM({
  // Other Next.js configurations
  reactStrictMode: false,
  target: 'serverless',
  webpack(config) {
    config.resolve.extensions.push('.ts', '.tsx')
    return config
  },
})
