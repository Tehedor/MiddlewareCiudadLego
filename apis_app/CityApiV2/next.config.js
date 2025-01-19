// next.config.js
// // next.config.js
// module.exports = {
//     reactStrictMode: true,
// };

const EnvConfig = require('./utils/env.config');

const {mode_container} = EnvConfig();

module.exports = {
    reactStrictMode: true,
    basePath: mode_container  ? '/apisApp' : '',
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
// next.config.js
// // next.config.js
// module.exports = {
//     reactStrictMode: true,
// };