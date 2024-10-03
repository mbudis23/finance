const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required : true
    },
    accounts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "accounts"
        }
    ]
})

module.exports = mongoose.model("users", userSchema)