import bcrypt from "bcrypt";
import User from "../models/user.js";

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
                res.json({
                    message:"User logged in successfully"
                })
            }else{
                res.status(403).json({
                    message:"Password is incorrect"
                })
            }
        }  
        
    })
}