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
    const { accountId } = req.params;
    const userId = req.user.id;

    try {
        console.log(`User ID: ${userId}, Account ID: ${accountId}`);

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(400).json({
                message: "User does not exist"
            });
        }

        const accountToDelete = await Account.findOne({ _id: accountId, user: userId });
        if (!accountToDelete) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        console.log(`Account to delete: ${accountToDelete._id}`); 
        await Promise.all([
            Income.deleteMany({ _id: { $in: accountToDelete.incomes } }),
            Expense.deleteMany({ _id: { $in: accountToDelete.expenses } }),
            Transfer.deleteMany({ _id: { $in: accountToDelete.transfer_in } }),
            Transfer.deleteMany({ _id: { $in: accountToDelete.transfer_out } }),
            Transfer.deleteMany({ _id: { $in: accountToDelete.transfer_tax } }),
            Adjustment.deleteMany({ _id: { $in: accountToDelete.adjustment } })
        ]);

        console.log(`Related data deleted for account ${accountToDelete._id}`); 
        await User.findByIdAndUpdate(
            userId,
            { $pull: { accounts: accountToDelete._id } }
        );
        await Account.findByIdAndDelete(accountToDelete._id);

        res.status(200).json({
            message: "Account deleted successfully",
            deletedAccount: accountToDelete
        });

    } catch (err) {
        console.error(`Error deleting account: ${err.message}`);
        res.status(500).json({
            message: "An error occurred while deleting the account",
            error: err.message
        });
    }
};

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