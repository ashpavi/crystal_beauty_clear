import express from "express";
import { deleteStudent, getAllStudents, saveStudent, updateStudent } from "../controllers/studentController.js";

const studentRouter = express.Router();

//functions have been imported from the studentController
studentRouter.get("/",getAllStudents)

studentRouter.post("/",saveStudent)

studentRouter.put("/",updateStudent)

studentRouter.delete("/",deleteStudent)

export default studentRouter;