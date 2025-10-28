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
