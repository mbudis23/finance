const Adjustment = require('../models/adjustmentModel');
const Account = require('../models/accountModel');

exports.addAdjustment = async (req, res) => {
    const { date, account, amount, notes } = req.body;

    try {
        const existAccount = await Account.findById(account);
        if (!existAccount) {
            return res.status(404).json({
                message: "Account not found"
            })
        }
        const newAdjustment = new Adjustment({
            date,
            account,
            amount,
            notes
        })
        await newAdjustment.save();
        await Account.findByIdAndUpdate(account, {
            $push: {adjustment: newAdjustment._id}
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}