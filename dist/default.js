"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbName = exports.__prod__ = void 0;
require('dotenv').config();
module.exports = {
    environment: 'NODE_ENV',
    database: {
        name: 'DB_NAME'
    }
};
exports.__prod__ = process.env.NODE_ENV === 'production';
exports.dbName = process.env.DB_NAME;
//# sourceMappingURL=default.js.map