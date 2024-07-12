import pool, { createTable } from "../configs/db";

type Data = Record<string, any>;

export const createModel = (
  tableName: string,
  columns?: Record<string, string>
) => {
  const define = async () => {
    if (columns) {
      await createTable(tableName, columns);
    }
  };

  const create = async (data: Data): Promise<Data> => {
    const keys = Object.keys(data).join(", ");
    const values = Object.values(data);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

    const query = `INSERT INTO ${tableName} (${keys}) VALUES (${placeholders}) RETURNING *`;
    const result = await pool.query(query, values);
    return result.rows[0];
  };

  const findById = async (id: string): Promise<Data> => {
    const query = `SELECT * FROM ${tableName} WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  };

  const findByUsername = async (username: string): Promise<Data> => {
    const query = `SELECT * FROM ${tableName} WHERE username = $1`;
    const result = await pool.query(query, [username]);
    return result.rows[0];
  };

  const findAll = async (): Promise<Data[]> => {
    const query = `SELECT * FROM ${tableName}`;
    const result = await pool.query(query);
    return result.rows;
  };

  const update = async (id: number, data: Data): Promise<Data> => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map((key, i) => `${key} = $${i + 2}`).join(", ");

    const query = `UPDATE ${tableName} SET ${setClause} WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [id, ...values]);
    return result.rows[0];
  };

  const remove = async (id: number): Promise<void> => {
    const query = `DELETE FROM ${tableName} WHERE id = $1`;
    await pool.query(query, [id]);
  };

  return {
    define,
    create,
    findById,
    findAll,
    update,
    remove,
    findByUsername,
  };
};
