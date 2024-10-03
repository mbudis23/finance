const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true
    },
    initial_balance: {
        type: Number,
        default: 0
    },
    current_balance: {
        type: Number,
        default: 0,
    },
    incomes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'incomes'
        }
    ],
    expenses: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'expenses'
        }
    ],
    transfer_in: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'transfers'
        }
    ],
    transfer_out: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'transfers'
        }
    ],
    transfer_tax: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'transfers'
        }
    ],
    adjustment: {
        type: mongoose.Schema.ObjectId,
        ref: 'adjustments'
    }
})

module.exports = mongoose.model('accounts', accountSchema)