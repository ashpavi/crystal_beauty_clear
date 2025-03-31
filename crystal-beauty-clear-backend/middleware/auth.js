import jwt from "jsonwebtoken"; //importing the jsonwebtoken package
import dotenv from "dotenv"; //importing the dotenv package
dotenv.config(); //configuring the dotenv package

export default function verifyJWT (req,res,next){
    const header= req.header("Authorization");
    if(header != null){
        const token= header.replace("Bearer ","") //this will remove the bearer from the token
    
    console.log(token) // this will print the token
    jwt.verify(token,process.env.JWT_KEY,(err, decoded)=>{      //this will verify the token
        console.log(decoded) //this will print the decoded token

        if(decoded != null){     //if the token is not null then we will set the user to the decoded token
            req.user= decoded
        }
    }
) 
    }
     next(); //next is used to pass the control to the next middleware function 
}