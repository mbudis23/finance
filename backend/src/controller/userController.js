const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.registerUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const salt = await bcrypt.genSalt(23);
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