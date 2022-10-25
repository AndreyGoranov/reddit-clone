import * as dotenv from 'dotenv'
dotenv.config();
module.exports = {
  environment: process.env.NODE_ENV,
  __prod__: process.env.NODE_ENV === 'production',
  database: {
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  },
  redisDependencies: {
    forgetPasswordPrefix: process.env.FORGET_PASSWORD_PREFIX,
    secret: process.env.REDIS_SECRET,
  },
  cookie: {
    name: process.env.COOKIE_NAME,
  },
  port: process.env.PORT,
}
