import queries from "../db/queries.js";

export async function deletePhone(req, res) {
  const { id } = req.params;

  try {
    const deletedPhone = await queries.deletePhone(id);

    if (!deletedPhone) {
      return res.status(404).send("Phone not found");
    }

    res.status(200).json({
      message: "Phone deleted successfully",
      phone: deletedPhone
    });
  } catch (error) {
    console.error("Error deleting phone:", error);
    res.status(500).send("Internal Server Error");
  }
}
