import dev from './dev.js';

import prod from './prod.js';

const env = process.env.NODE_ENV || 'development';
const configs = { development: dev,  production: prod };

export default configs[env] || dev;