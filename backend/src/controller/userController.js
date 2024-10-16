const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.registerUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({
            message: "Register successfully"
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
};

exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ 
            email: email
        })

        if (!user){
            return res.status(404).json({
                message: "User Not Found"
            })
        }
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn:"1h"
        });

        res.cookie('token', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3600000,
        });
        res.status(200).json({
            message: "Login Succesfully"
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

exports.deleteUser = async (req, res)=>{
    const id = req.user.id;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({
            message: "Delete User Successfully"
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}