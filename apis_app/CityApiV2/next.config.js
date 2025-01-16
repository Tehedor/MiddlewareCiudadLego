// next.config.js
const EnvConfig = require('./utils/env.config');

const {mode_container} = EnvConfig();

module.exports = {
    reactStrictMode: true,
    // basePath: mode_container === 'true'  ? '/apisApp' : '',
    basePath: '/apisApp' ,
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Forwarded-Proto',
                        value: 'http'
                    }
                ]
            }
        ]
    }
};
// // next.config.js
// module.exports = {
//     reactStrictMode: true,
// };s
