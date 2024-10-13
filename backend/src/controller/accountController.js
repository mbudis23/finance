const Account = require('../models/accountModel');
const Income = require('../models/incomeModel');
const User = require('../models/userModel');
const Expense = require('../models/expenseModel');
const Adjustment = require('../models/adjustmentModel');

exports.createAccount = async (req, res) =>{
    const {name, initial_balance} = req.body;
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
        initial_balance
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
        await Promise.all([
            ...deletedAccount.incomes.map(value => Income.findByIdAndDelete(value)),
            ...deletedAccount.expenses.map(value => Expense.findByIdAndDelete(value)),
            ...deletedAccount.transfer_in.map(value => Transfer.findByIdAndDelete(value)),
            ...deletedAccount.transfer_out.map(value => Transfer.findByIdAndDelete(value)),
            ...deletedAccount.transfer_tax.map(value => Transfer.findByIdAndDelete(value)),
            ...deletedAccount.adjustment.map((value)=> Adjustment.findByIdAndDelete(value))
        ]);
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