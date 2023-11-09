/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'**.googleusercontent.com',
                port:'',
            }
        ]
    },
    async headers() {
       return [
          {
             source: '/:path*',
             headers: [
                { key: 'referrer-policy', value: 'no-referrer'}
             ]
          }
       ]
    }
 }
 
 module.exports = nextConfig