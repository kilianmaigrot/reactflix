import pg from "pg";
const { Pool } = pg;

const pool = new Pool ({
  user: "postgres",
  host: "localhost",
  database: "logintp",
  password: "AR3SRW6Iy",
  port: 5432
});

export default pool;