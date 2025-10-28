import { getAllPhones } from "../controllers/getPhones.js";
import express from "express";

const getPhones = express.Router();

getPhones.get("/", getAllPhones);

export default getPhones;
