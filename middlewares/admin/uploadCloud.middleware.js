const uploadToCloudinary = require("../../helpers/uploadToCloudinary");

module.exports.upload = async (req, res, next) => {
    if (req.file) {
        try {
            const link = await uploadToCloudinary(req.file.buffer);
            req.body[req.file.fieldname] = link;
        } catch (error) {
            console.error("Lỗi khi tải lên Cloudinary:", error);
            res.status(500).send("Tải lên hình ảnh thất bại, vui lòng thử lại.");
        }
    }

    next();
};
