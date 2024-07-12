import { Pool } from "pg";

const pool = new Pool({
  user: "root",
  host: "localhost",
  database: "mydatabase",
  password: "my-secret",
  port: 5432,
});

export default pool;

export const createTable = async (
  tableName: string,
  columns: Record<string, string>
) => {
  const columnsDefinition = Object.entries(columns)
    .map(([column, type]) => `${column} ${type}`)
    .join(", ");
  const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnsDefinition})`;
  await pool.query(query);
};
