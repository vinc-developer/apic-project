import * as mysql from 'mysql2/promise';

const mysqlConfig = {
  user: 'root',
  password: '',
  database: 'apic-project',
};

export const pool = mysql.createPool(mysqlConfig);
