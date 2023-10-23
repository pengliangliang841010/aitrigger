/** @type {import('next').NextConfig} */

const path=require('path')

let proxy;
if(process.env.APP_ENV==='dev'){
  proxy={rewrites:async ()=> {
    return [
      {
        source: '/create-payment-intent/:patn*',
        destination: 'http://127.0.0.1:4242/create-payment-intent/:patn*'
      },
      {
        source: '/config/:patn*',
        destination: 'http://127.0.0.1:4242/config/:patn*'
      }
    ]
  }
}}

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.pornpen.ai'
      },
      {
        protocol: 'https',
        hostname: 'api.porngen.art'
      }
    ],
  },
  reactStrictMode: true,
  env: {
    APP_ENV:process.env.APP_ENV
  },
  sassOptions: {
    includePaths: [path.join(__dirname, './styles')],
    prependData: `@import "var.scss";`
  },
  ...proxy
}
