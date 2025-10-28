import { insertPhone } from "../controllers/insertPhone.js";
import { getAllPhones, searchPhones } from "../controllers/getPhones.js";
import { updatePhone, getPhoneById } from "../controllers/updatePhone.js";
import { deletePhone } from "../controllers/deletePhone.js";
import express from "express";

const getPhones = express.Router();

// READ - Get all phones
getPhones.get("/", getAllPhones);

// READ - Search phones with filters
getPhones.get("/search", searchPhones);

// READ - Get single phone by ID
getPhones.get("/:id", getPhoneById);

// CREATE - Insert new phone
getPhones.post("/insert", insertPhone);

// UPDATE - Update phone by ID
getPhones.put("/:id", updatePhone);

// DELETE - Delete phone by ID
getPhones.delete("/:id", deletePhone);

export default getPhones;
