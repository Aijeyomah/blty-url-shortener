import 'dotenv/config';

export default {
  NODE_ENV: process.env.SHORT_NODE_ENV,
  SHORT_SERVICE: process.env.SHORT_DOMAIN,
};
