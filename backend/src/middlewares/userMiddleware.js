const User = require("../models/userModel");

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