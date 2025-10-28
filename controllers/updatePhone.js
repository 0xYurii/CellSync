import queries from "../db/queries.js";

export async function updatePhone(req, res) {
  const { id } = req.params;
  const { name, brand, price, stock_quantity, color, storage } = req.body;

  try {
    const updatedPhone = await queries.updatePhone(
      id,
      name,
      brand,
      price,
      stock_quantity,
      color,
      storage
    );

    if (!updatedPhone) {
      return res.status(404).send("Phone not found");
    }

    res.status(200).json({
      message: "Phone updated successfully",
      phone: updatedPhone
    });
  } catch (error) {
    console.error("Error updating phone:", error);
    res.status(500).send("Internal Server Error");
  }
}

export async function getPhoneById(req, res) {
  const { id } = req.params;

  try {
    const phone = await queries.getPhoneById(id);

    if (!phone) {
      return res.status(404).send("Phone not found");
    }

    res.status(200).json(phone);
  } catch (error) {
    console.error("Error fetching phone:", error);
    res.status(500).send("Internal Server Error");
  }
}
