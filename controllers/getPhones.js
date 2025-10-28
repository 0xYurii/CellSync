import queries from "../db/queries.js";

export async function getAllPhones(req, res) {
  const phones = await queries.getallPhones();
  console.log("phones", phones);
  // res.send("Phones: " + phones.map((phone) => phone.name).join(", "));
  // res.json(phones);
  res.send(`
    <h1>All Phones</h1>
    <ul>
      ${phones.map((phone) => `<li>${phone.name} - $${phone.price}</li>`).join("")}
    </ul>
  `);
}
export async function searchPhones(req, res) {
  const { brand, minPrice, maxPrice, storage } = req.query;
  const phones = await queries.searchPhones(brand, minPrice, maxPrice, storage);
  res.send(`
    <h1>Search Results</h1>
    <p>Found ${phones.length} phone(s)</p>
    <ul>
      ${phones.map((phone) => `<li>${phone.name} (${phone.brand}) - $${phone.price} - ${phone.storage} - ${phone.color}</li>`).join("")}
    </ul>
  `);
}
