import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import verifyJWT from './middleware/auth.js';
import orderRouter from './routes/orderRoute.js';


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
//middleware function to verify the JWT
app.use(verifyJWT)



//importing the studentRouter
app.use("/api/user", userRouter)
//importing the productRouter
app.use("/api/product", productRouter)
//importing the orderRouter
app.use("/api/order", orderRouter)




//define the port number
app.listen(5000,
    ()=>{
    console.log("Server is running on port 5000");
})