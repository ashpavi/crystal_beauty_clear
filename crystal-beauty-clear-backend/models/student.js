 import mongoose from "mongoose"       
        
//Structure
const studentSchema=new mongoose.Schema({
    name:String,
    age:Number,
    city:String
    })

//Model
const Student =mongoose.model("students",studentSchema)

//Export
export default Student;