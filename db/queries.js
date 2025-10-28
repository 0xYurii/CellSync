import pool from "./pool.js";

async function getallPhones() {
  const { rows } = await pool.query("SELECT * FORM phones");
  return rows;
}

export default {
  getallPhones,
};
