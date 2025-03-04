import express from "express";
import { getAllItems, getGoodItems, saveItem, searchItem } from "../controllers/itemController.js";

const itemRouter = express.Router();

itemRouter.get("/", getAllItems)
itemRouter.post("/", saveItem)
itemRouter.get("/good", getGoodItems)

//normal way by giving the body jason
//itemRouter.get("/search", searchItem)

//by getting by variable name
itemRouter.get("/:name", searchItem)

export default itemRouter;