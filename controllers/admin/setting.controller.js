const Setting = require("../../models/setting.model")

// [GET] /admin/setting
module.exports.general = (req, res) => {
    res.render("admin/pages/settings/general", {
        pageTitle: "Cài đặt"
    })
}

// [PATCH] /admin/setting
module.exports.generalPatch = async (req, res) => {
    const setting = await Setting.findOne();

    if (setting){
        await Setting.updateOne({ _id: setting.id }, req.body);
    } else {
        const newSetting = new Setting(req.body);
        await newSetting.save();
    }
    
    res.redirect("back");
}
