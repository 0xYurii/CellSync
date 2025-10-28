import pool from "./pool.js";

async function getallPhones() {
  const { rows } = await pool.query("SELECT * FROM phones");
  return rows;
}

export default {
  getallPhones,
};
