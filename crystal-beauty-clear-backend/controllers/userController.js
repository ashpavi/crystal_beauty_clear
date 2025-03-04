import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export function saveUser(req, res) {
    
    //to create a hash password
    const hashedPassword = bcrypt.hashSync(req.body.password,10)
    const user = new User({
        email: req.body.email,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password: hashedPassword
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

                const token=jwt.sign(userData,"random456")
                res.json({
                    message:"Login successful",
                    token:token
                })


            }else{
                res.status(403).json({
                    message:"Password is incorrect"
                })
            }
        }  
        
    })
}