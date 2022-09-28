require('dotenv').config();

module.exports = {
  environment: 'NODE_ENV',
  database: {
    name: 'DB_NAME'
  }
}
export const __prod__ = process.env.NODE_ENV === 'production';
export const dbName = process.env.DB_NAME;