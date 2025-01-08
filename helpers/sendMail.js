

module.exports.sendMail = (email, subject, text, html) => {
    const nodemailer = require('nodemailer');

    // Tạo transporter (cấu hình SMTP)
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Hoặc 'hotmail', 'yahoo', hoặc host SMTP của bạn
        auth: {
            user: process.env.EMAIL_USER, // Email của bạn
            pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng (App Password) hoặc OAuth2
        },
    });

    // Tùy chọn email
    const mailOptions = {
        from: process.env.EMAIL_USER, // Người gửi
        to: email, // Người nhận
        subject: subject,
        text: text,
        html: html, // Có thể gửi cả HTML
    };

    // Gửi email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error:', error);
        }
        console.log('Email sent:', info.response);
    });

}