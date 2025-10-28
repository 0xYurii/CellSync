import { getAllPhones, searchPhones } from "../controllers/getPhones.js";
import express from "express";

const getPhones = express.Router();

getPhones.get("/", getAllPhones);
getPhones.get("/search", searchPhones);
export default getPhones;
