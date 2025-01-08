const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
    {
        email: String,
        otp: String,
        expireAt: {
            type: Date,
            index: { expires: 0 }
        }
    },
    {
        timestamps: true,
    }
);

const Otp = mongoose.model("Otp", otpSchema, "otps");
module.exports = Otp;
