const Expense = require('../models/expenseModel');
const Account = require('../models/accountModel');

exports.addExpense = async (req, res) => {
    const {date, account, category, amount, notes } = req.body;

    try {
        const existAccount = await Account.findById(account);
        if (!existAccount) {
            return res.status(404).json({
                message: "Account Not Found"
            });
        }

        const newExpense = new Expense({
            date,
            account,
            category,
            amount,
            notes
        });
        await newExpense.save();
        await Account.findByIdAndUpdate(account, {
            $push: {expenses: newExpense._id}
        });

        res.status(201).json({
            message: "Expense added sucessfully",
            expense : newExpense
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}