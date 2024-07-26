import * as mysql from 'mysql2/promise';

const mysqlConfig = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

export const pool = mysql.createPool(mysqlConfig);
