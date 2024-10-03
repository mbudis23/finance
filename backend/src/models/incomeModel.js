const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    date : {
        type: Date,
        required: true
    },
    account_id:{
        type: mongoose.Schema.ObjectId,
        ref: 'accounts',
        required: true
    },
    streams: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }, 
    notes: {
        type: String
    }
});

module.exports = mongoose.model('incomes', incomeSchema);