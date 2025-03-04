import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import studentRouter from './routes/studentRouter.js';
import itemRouter from './routes/itemRouter.js';
import userRouter from './routes/userRouter.js';


const app = express();

//Connection Stiring
mongoose.connect("mongodb+srv://admin:123@cluster0.fc5yt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
    ()=>{
        console.log("Connected to MongoDB");
    }
).catch(
    ()=>{
        console.log("Error connecting to MongoDB");
    }
)

//BodyParser is used to simplify the process of parsing the body of an HTTP request
app.use(bodyParser.json());

//we imported the studentRouter
app.use("/api/student", studentRouter)

app.use("/api/item", itemRouter)

app.use("/api/user", userRouter)




//define the port number
app.listen(5000,
    ()=>{
    console.log("Server is running on port 5000");
})