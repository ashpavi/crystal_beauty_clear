import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"; //importing the dotenv package
dotenv.config(); //configuring the dotenv package
import axios from "axios"; //importing the axios package to make HTTP requests
import e from "express";

export function saveUser(req, res) {

    if(req.body.role== "admin"){     //ony admin can create another admin
        if(req.user==null){     //if user is not logged in 
            res.status(403).json({
                message:"Please login as admin before creating admin account"
            })
            return;
        }
        if(req.user.role!="admin"){     //if user is not admin
            res.status(403).json({
                message:"You are not authorized to create admin account"
            })
            return;
        }
    }
    
    //to create a hash password
    const hashedPassword = bcrypt.hashSync(req.body.password,10)
    const user = new User({
        email: req.body.email,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password: hashedPassword,
        role:req.body.role,
    })

    user.save().then(()=>{
        res.json({
            message:"User saved successfully"
        })
    }).catch((err) => {
        console.error(err);
        res.status(500).json({ message: "User not saved" 

        })
    });
    
} 

export function loginUser(req, res) {
    const email=req.body.email;
    const password=req.body.password;

    User.findOne({
        email:email
    }).then((user)=>{
        if(user==null){
            res.status(404).json({
                message:"User not found"
            })
        }else{
            const isPasswordCorrect= bcrypt.compareSync(password,user.password);
            if(isPasswordCorrect){
                
                const userData={
                    email: user.email,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    role:user.role,
                    phone:user.phone,
                    isDisabled:user.isDisabled,
                    isEmailVerified:user.isEmailVerified

                }
                console.log(userData)

                const token=jwt.sign(userData,process.env.JWT_KEY)
                res.json({
                    message:"Login successful",
                    token:token,
                    user:userData,
                })


            }else{
                res.status(403).json({
                    message:"Password is incorrect"
                })
            }
        }  
        
    })
}

export async function googleLogin(req,res){
    const accessToken = req.body.accessToken;

    try{
        const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                    Authorization: 'Bearer ' + accessToken
            }
        })
        const user = await User.findOne({
                email: response.data.email
                
            })
            if(user==null){
                // If user does not exist, create a new user
                const newUser = new User({
                    email: response.data.email,
                    firstName: response.data.given_name,
                    lastName: response.data.family_name,
                    role: "user",
                    isEmailVerified: true,
                    password : accessToken
                })
                await newUser.save()
                

                const userData={
                    email: response.data.email,
                    firstName: response.data.given_name,
                    lastName: response.data.family_name,
                    role: "user",
                    isEmailVerified: true,
                    isDisabled: false,
                    phone :"Not Given",

                }

                const token=jwt.sign(userData,process.env.JWT_KEY,{
                    expiresIn: '48h' // Set token expiration time
                })

                res.json({
                    message:"Login successful",
                    token:token,
                    user:userData,
                })
            }else{
                const userData={
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    phone: user.phone,
                    isDisabled: user.isDisabled,
                    isEmailVerified: user.isEmailVerified

                }
                

                const token=jwt.sign(userData,process.env.JWT_KEY,{
                    expiresIn: '48h' // Set token expiration time
                })

                res.json({
                    message:"Login successful",
                    token:token,
                    user:userData,
                })
            }

        console.log(response.data)
    }catch(error){
        console.error("Google login failed:", error)
        res.status(500).json({ message: "Google login failed" })
    }
}

export function getCurrentUser(req,res){
    if(req.user== null){
        res.status(403).json({
            message: "Please login to get user information"
        })
        return
    }
    res.json({
        user: req.user
    })
}