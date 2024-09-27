const generateHelper = require("../helpers/generate");
const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        token: {
            type: String,
            default: generateHelper.generateRandomString(30),
        },
        phone: String,
        avatar: String,
        role_id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Role'
        },
        status: String,
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: Date,
    },
    {
        timestamps: true,
    }
);

const Account = mongoose.model("Account", accountSchema, "accounts");

module.exports = Account;
