const Income = require('../models/incomeModel');
const Account = require('../models/accountModel')

exports.addIncome = async (req, res) => {
    const { date, account, streams, amount, notes } = req.body;

    try {
        const existAccount = await Account.findById(account);
        if (!existAccount) {
            return res.status(404).json({
                message: "Account Not Found"
            });
        }

        const newIncome = new Income({
            date,
            account,
            streams,
            amount,
            notes
        });

        await newIncome.save();
        await Account.findByIdAndUpdate(account, {
            $push: { incomes: newIncome._id }
        });

        res.status(201).json({
            message: "Income added successfully",
            income: newIncome
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};