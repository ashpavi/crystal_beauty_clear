import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import jwt, { decode } from 'jsonwebtoken';


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

//middleware 
app.use((req,res,next)=>{
    const header= req.header("Authorization");
    if(header != null){
        const token= header.replace("Bearer ","") //this will remove the bearer from the token
    
    console.log(token) // this will print the token
    jwt.verify(token, "random456",(err, decoded)=>{      //this will verify the token
        console.log(decoded) //this will print the decoded token

        if(decoded != null){     //if the token is not null then we will set the user to the decoded token
            req.user= decoded
        }
    }) 
    }
     next(); //next is used to pass the control to the next middleware function 
})


//importing the studentRouter
app.use("/api/user", userRouter)




//define the port number
app.listen(5000,
    ()=>{
    console.log("Server is running on port 5000");
})