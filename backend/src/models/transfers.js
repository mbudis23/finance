const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
    date : {
        type: Date,
        required: true
    },
    from:{
        type: mongoose.Schema.ObjectId,
        ref: 'accounts',
        required: true
    },
    to:{
        type: mongoose.Schema.ObjectId,
        ref: 'accounts',
        required: true
    },
    amount : {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    }, 
    notes: {
        type: String
    }
});

module.exports = mongoose.model('transfers', transferSchema);