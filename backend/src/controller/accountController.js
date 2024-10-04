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
        await User.updateOne({
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

exports.deleteAccount = async (req, res) => {
    const { name } = req.body;
    const id = req.user.id;

    try {
        const ExistUser = await User.findById(id);
        if (!ExistUser) {
            return res.status(400).json({
                message: "User is not exist"
            });
        }

        const deletedAccount = await Account.findOne({name: name, user: id});
        if(!deletedAccount) {
            return res.status(404).json({
                message : "Account not found"
            });
        }
        await User.findByIdAndUpdate(
            id,
            { $pull: { accounts: deletedAccount._id } },
        );

        await Account.findByIdAndDelete(deletedAccount._id);
        res.status(200).json({
            message: "Delete Account Successfully",
            deletedAccount
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}