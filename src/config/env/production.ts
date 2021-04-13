import 'dotenv/config';

export default {
  NODE_ENV: process.env.SHORT_NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  SHORT_SERVICE: process.env.SHORT_DOMAIN,
};
