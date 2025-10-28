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

async function createPhone(name, brand, price, stock, color, storage) {
  await pool.query(
    "INSERT INTO phones (name, brand, price, stock_quantity, color, storage) VALUES ($1, $2, $3, $4, $5, $6)",
    [name, brand, price, stock, color, storage],
  );
}

async function getPhoneById(id) {
  const { rows } = await pool.query("SELECT * FROM phones WHERE id = $1", [id]);
  return rows[0];
}

async function updatePhone(id, name, brand, price, stock, color, storage) {
  const { rows } = await pool.query(
    "UPDATE phones SET name = $1, brand = $2, price = $3, stock_quantity = $4, color = $5, storage = $6 WHERE id = $7 RETURNING *",
    [name, brand, price, stock, color, storage, id],
  );
  return rows[0];
}

async function deletePhone(id) {
  const { rows } = await pool.query(
    "DELETE FROM phones WHERE id = $1 RETURNING *",
    [id],
  );
  return rows[0];
}

export default {
  getallPhones,
  searchPhones,
  createPhone,
  getPhoneById,
  updatePhone,
  deletePhone,
};
