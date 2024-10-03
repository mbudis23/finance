const User = require("../models/userModel");
const jwt = require('jsonwebtoken');

exports.userExist = async (req, res) => {
    const {email} = req.body;
    const userExist = await User.findOne({
        email
    });
    if (userExist) {
        res.status(400);
        return res.json({
            message: "Email has been used"
        });
    }
}

exports.authenticateToken = async(req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token){
        return res.status(401).json({
            message: 'Access Denied'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err){
        next(err)
    }
}