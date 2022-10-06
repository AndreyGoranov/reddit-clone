import * as dotenv from 'dotenv'
dotenv.config();
module.exports = {
  environment: process.env.NODE_ENV,
  __prod__: process.env.NODE_ENV === 'production',
  database: {
    name: process.env.DB_NAME,
  },
  redis: {
    secret: process.env.REDIS_SECRET,
  },
  port: process.env.PORT,
}
