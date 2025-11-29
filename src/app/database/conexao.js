// src/app/database/conexao.js
import mysql from "mysql2/promise";
import config from "../../config/index.js"
// ✅ Cria um pool de conexões (sem await no topo)
const pool =  mysql.createPool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

console.log("✅ Conectado ao banco de dados MySQL via pool!");

export default pool;
