const Account = require('../models/accountModel');
const Income = require('../models/incomeModel');
const User = require('../models/userModel');
const Expense = require('../models/expenseModel');
const Adjustment = require('../models/adjustmentModel');
const mongoose = require('mongoose');

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

exports.getAccountsByUserId = async (req, res) => {
    const userId = req.user.id;
    try {
        const accounts = await Account.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId(userId) }
            },
            {
                $lookup: {
                    from: 'incomes',
                    localField: 'incomes',
                    foreignField: '_id',
                    as: 'incomes'
                }
            },
            {
                $lookup: {
                    from: 'expenses',
                    localField: 'expenses',
                    foreignField: '_id',
                    as: 'expenses'
                }
            },
            {
                $lookup: {
                    from: 'transfers',
                    localField: 'transfer_in',
                    foreignField: '_id',
                    as: 'transfer_in'
                }
            },
            {
                $lookup: {
                    from: 'transfers',
                    localField: 'transfer_out',
                    foreignField: '_id',
                    as: 'transfer_out'
                }
            },
            {
                $lookup: {
                    from: 'adjustments',
                    localField: 'adjustment',
                    foreignField: '_id',
                    as: 'adjustment'
                }
            },
            {
                $addFields: {
                    total_incomes: { $sum: '$incomes.amount' },
                    total_expenses: { $sum: '$expenses.amount' },
                    total_transfer_in: { $sum: '$transfer_in.amount' },
                    total_transfer_out: { $sum: '$transfer_out.amount' },
                    total_transfer_tax: { $sum: '$transfer_out.tax'},
                    total_adjustments: { $sum: '$adjustments.amount'}
                }
            },
            {
                $project: {
                    name: 1,
                    user: 1,
                    initial_balance: 1,
                    current_balance: 1,
                    total_incomes: 1,
                    total_expenses: 1,
                    total_transfer_in: 1,
                    total_transfer_out: 1,
                    total_transfer_tax: 1,
                    total_adjustments: 1
                }
            }
        ]);

        if (accounts.length === 0) {
            return res.status(404).json({ message: "No accounts found for the user" });
        }

        res.status(200).json(accounts);
    } catch (err) {
        console.error("Error fetching account:", err);
        res.status(500).json({ message: "Server error" });
    }
};