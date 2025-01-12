const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
    {
        websiteName: String,
        websiteLogo: String,
        websiteEmail: String,
        phoneNumber: String,
        address: String,
        copyright: String,
    },
    { timestamps: true }
);

const Setting = mongoose.model("Setting", settingSchema, "settings");

module.exports = Setting;
