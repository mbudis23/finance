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
        res.status(200).json({
            message: "Adjustment Add Successfully"
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

exports.removeAdjustments = async (req, res) => {
    const {id} = req.params;
    try {
        const existAdjustment = await Adjustment.findById(id);
        if (!existAdjustment) {
            return res.status(404).json({
                message: "Adjustment not found"
            });
        }
        await Adjustment.findByIdAndDelete(id);
        await Account.findByIdAndUpdate(id, {
            $pull: {adjustment: id}
        })
        res.status(200).json({
            message: "Adjustment removed successfully"
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

exports.editAdjustment = async (req, res) => {
    const {id} = req.params;
    const { date, account, amount, notes } = req.body;

    try {
        const existAdjustment = await Adjustment.findById(id);
        if (!existAdjustment) {
            return res.status(404).json({
                message: "Adjustment Not Found"
            })
        }
        await Adjustment.findByIdAndUpdate(id, {
            date,
            account,
            amount,
            notes
        })
        res.status(200).json({
            message: "Edit Adjustment Successfully"
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}