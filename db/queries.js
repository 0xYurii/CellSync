import pool from "./pool.js";

async function getallPhones() {
  const { rows } = await pool.query("SELECT * FROM phones");
  return rows;
}
async function searchPhones(brand, minPrice, maxPrice, storage) {
  let query = "SELECT * FROM phones WHERE 1=1";
  const params = [];
  let paramCount = 1;

  if (brand) {
    query += ` AND brand = $${paramCount}`;
    params.push(brand);
    paramCount++;
  }

  if (minPrice) {
    query += ` AND price >= $${paramCount}`;
    params.push(minPrice);
    paramCount++;
  }

  if (maxPrice) {
    query += ` AND price <= $${paramCount}`;
    params.push(maxPrice);
    paramCount++;
  }

  if (storage) {
    query += ` AND storage = $${paramCount}`;
    params.push(storage);
    paramCount++;
  }

  const { rows } = await pool.query(query, params);
  return rows;
}

export default {
  getallPhones,
  searchPhones,
};
