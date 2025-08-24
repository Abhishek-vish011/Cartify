import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}


// Route for user login
const login = async(req, res)=>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.json({Message: "All fields required"})
        }

        const user = await userModel.findOne({email})

        if(!user){
            return res.json({Message: "User does not exist"});
        }
        const isMatch = bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({success: false, Message: "Invalid credential"})
        }else{
            const token = createToken(user._id)
            return res.json({success: true, token, Message:"User login Successfully"})
        }

    }catch(error){
       return res.json({sucecess: false,  Message: error.message})
    }

}


// Route for user Registration

const register = async (req, res)=>{
   try{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.json({Message: "All fields required"});
    }

    const exist = await userModel.findOne({email})

    if(exist){
        return res.json({sucecess:false, Message: "User already exist"});
    }

    if(!validator.isEmail(email)){
       return res.json({sucecess: false, Message:"Please enter valid email"})
    }
    if(password.length < 8){
         return res.json({sucecess: false, Message:"Please enter Strong password"})
    }

    // hasing function

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)


    const newUser = new userModel({
        name,
        email,
        password: hashedPassword
    })

    const user = await newUser.save()

    const token = createToken(user._id)

    res.json({sucecess: true, token})

   }catch(err){
     console.log(err);
     return res.json({sucecess: false, message:err.message})

   }
}

// Route for Admin login

const adminLogin = async (req, res)=>{
 try{
     const {email, password} = req.body;

      if(!email || !password){
            return res.json({Message: "All fields required"})
        }

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
             
             const token = jwt.sign(email+password, process.env.JWT_SECRET)

             res.json({success: true, token})
        }else{
            res.json({success: false, message: "Invalid credentail"})
        }

 }catch(err){
         console.log(err);
     return res.json({sucecess: false, message:err.message})

 }
}

export {login, register, adminLogin} 