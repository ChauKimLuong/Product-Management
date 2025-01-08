const Otp = require("../../models/otp.model")
const User = require("../../models/user.model")
const generateHelper = require("../../helpers/generate")

const sendMailHelper= require("../../helpers/sendMail")

const md5 = require("md5")

// [GET] /password/forgot
module.exports.forgot = (req, res) => {
    res.render("client/pages/password/forgot", {
        pageTitle: "Lấy lại mật khẩu"
    })
}

// [POST] /password/forgot
module.exports.forgotPost = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    }

    const otp = {
        email: req.body.email,
        otp: generateHelper.generateRandomNumber(6),
        expireAt: Date.now() + 1000 * 3 * 60,
    }

    const otpObj = new Otp(otp);
    await otpObj.save();

    const subject = "Mã OTP lấy lại mật khẩu";
    const text = "";
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mã OTP</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f7;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                padding: 20px;
            }
            .header {
                text-align: center;
                background-color: #4CAF50;
                color: #ffffff;
                padding: 20px;
                font-size: 24px;
            }
            .content {
                padding: 20px;
                text-align: center;
                color: #333333;
            }
            .otp-code {
                display: inline-block;
                background: #f4f4f7;
                color: #4CAF50;
                font-size: 32px;
                font-weight: bold;
                padding: 10px 20px;
                border: 2px dashed #4CAF50;
                margin: 20px 0;
                border-radius: 8px;
            }
            .footer {
                text-align: center;
                font-size: 14px;
                color: #888888;
                padding: 10px;
            }
            .footer a {
                color: #4CAF50;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                Xác thực tài khoản
            </div>
            <div class="content">
                <p>Xin chào,</p>
                <p>Đây là mã OTP của bạn. Mã này sẽ hết hạn sau 3 phút:</p>
                <div class="otp-code">${otp.otp}</div>
                <p>Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email.</p>
            </div>
            <div class="footer">
                <p>Trân trọng,<br>Đội ngũ của chúng tôi</p>
                <p><a href="#">Liên hệ hỗ trợ</a></p>
            </div>
        </div>
    </body>
    </html>
`
    sendMailHelper.sendMail(req.body.email, subject, text, html);

    res.redirect(`/password/otp?email=${req.body.email}`);
}

// [GET] /password/otp
module.exports.otp = async (req, res) => {
    res.render("client/pages/password/otp", {
        pageTitle: "Nhập mã OTP",
        email: req.query.email,
    })
}

// [POST] /password/otp
module.exports.otpPost = async (req, res) => {
    const otp = await Otp.findOne({ email: req.body.email, otp: req.body.otp });

    if (!otp) {
        req.flash("error", "Mã OTP không chính xác!");
        res.redirect("back");
        return;
    }

    const user = await User.findOne({ email: req.body.email });

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/password/reset");
}

// [GET] /password/reset
module.exports.reset = async (req, res) => {
    res.render("client/pages/password/reset", {
        pageTitle: "Đổi mật khẩu",
    })
}

// [POST] /password/reset
module.exports.resetPost = async (req, res) => {
    await User.updateOne({ tokenUser: req.cookies.tokenUser }, { password: md5(req.body.password) });

    res.redirect("/");
}