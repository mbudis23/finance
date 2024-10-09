const Transfer = require('../models/transfers');
const Account = require('../models/accountModel');

exports.addTransfer = async (req, res) => {
    const { date, from, to, amount, tax, notes } = req.body;

    try {
        const existFromAccount = await Account.findById(from);
        if (!existFromAccount) {
            return res.status(404).json({
                message: "From Account not found"
            });
        }

        const existToAccount = await Account.findById(to);
        if (!existToAccount){
            return res.status(404).json({
                message: "To Account not found"
            })
        }

        const newTransfer = new Transfer({
            date,
            from,
            to,
            amount,
            tax,
            notes
        })

        await newTransfer.save()

        await Account.findByIdAndUpdate(from, {
            $push : {
                transfer_out: newTransfer._id,
                transfer_tax: newTransfer._id
            }
        })

        await Account.findByIdAndUpdate(to, {
            $push : {transfer_in: newTransfer._id}
        })

        res.status(200).json({
            message: "Add Transfer Successfully"
        })
    } catch (err) {
        res.status(400).json({
            message : err.message
        })
    }
}


exports.removeTransfer = async (req, res) => {
    const {id} = req.params;
    
    try {
        const existTransfer = await Transfer.findById(id);
        if (!existTransfer) {
            return res.status(404).json({
                message: "Transfer not found"
            })
        }
        await Account.findByIdAndUpdate(existTransfer.from, {
            $pull : { 
                transfer_out : id,
                transfer_tax : id
            }
        })
        await Account.findByIdAndUpdate(existTransfer.to, {
            $pull: {
                transfer_in: id
            }
        })
        await Transfer.findByIdAndDelete(id)
        res.status(200).json({
            message: "Remove transfer successfully"
        })
    } catch (err) {
        res.status(400).json({
            message: "Remove transfer failed"
        })
    }
}