import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"; 
import nodemailer from "nodemailer";
import axios from "axios";
import { OTP } from "../models/otp.js";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "ashenpavithra@gmail.com",
        pass: "zxaoudeybctuiqow",
    },
})
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

export async function sendOTP(req,res){
    const email = req.body.email;

    const otp=Math.floor(Math.random()*9000)+1000; //generate 4 digit otp

    const message={
        from: "ashenpavithra@gmail.com",
        to: email,
        subject: "Your OTP for Password Reset",
        text: `Your OTP for password reset is ${otp}.`
    }

    const newOTP = new OTP({
        email: email,
        otp: otp
    })

    newOTP.save().then(()=>{
        console.log("OTP saved to database")
    })

    transporter.sendMail(message, (err,info)=>{
        if(err){
            console.error("Error sending OTP email:", err);
            res.status(500).json({ message: "Error sending OTP email" });
        }else{
            console.log("OTP email sent:", info.response);
            res.json({
                message: "OTP sent successfully",
                otp: otp // In a real application, do not send the OTP back in the response
            });
        }
    })
}

export async function resetPassword(req,res){
    const email= req.body.email;
    const password= req.body.password;
    const otp= req.body.otp;

    try{
       const lastOTPdata= await OTP.findOne(
        {email: email}).sort({createdAt: -1}); //get the latest otp for the email

        if(lastOTPdata==null){
            res.status(400).json({
                message: "No OTP found for this email"
            })
            return;
        }

        if(lastOTPdata.otp != otp){
            res.status(400).json({
                message: "Invalid OTP"
            })
            return;
        }

    const hashedPassword = bcrypt.hashSync(password,10)
    await User.updateOne(
        {email: email},
        {password: hashedPassword}
    )
    await OTP.deleteMany({email: email})
    res.json({
        message: "Password reset successful"
    })


    }catch(e){
        res.status(500).json({
            message : "Error resetting password"
        })
    }


}