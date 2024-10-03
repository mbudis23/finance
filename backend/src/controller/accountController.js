const Account = require('../models/accountModel');
const User = require('../models/userModel')

exports.createAccount = async (req, res) =>{
    const {name} = req.body;
    const user = req.user.id
    try {
        const ExistUser = await User.findById(user)
        if(!ExistUser){
            return res.status(404).json({
                message: "User not found"
            })
        }
        const newAccount = new Account({
        name,
        user,
        })
        await newAccount.save();
        await ExistUser.updateOne({
            _id: user
        }, {
            $push: { accounts: newAccount._id}
        })
        res.status(201).json({
            message: "Account Created Successfully"
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}