import queries from "../db/queries.js";
export async function insertPhone(req, res) {
  const { name, brand, price, stock, color, storage } = req.body;
  try {
    await queries.createPhone(name, brand, price, stock, color, storage);
    res.status(201).send("Phone inserted successfully");
  } catch (error) {
    console.error("Error inserting phone:", error);
    res.status(500).send("Internal Server Error");
  }
}
