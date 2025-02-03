// Express
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

const path = require('path');

//! Middleware để chặn /json/version và /json/list trước khi chúng được log
app.use((req, res, next) => {
    if (req.url.includes('/json/version') || req.url.includes('/json/list')) {
        // console.log(`Blocked request to ${req.url}`);
        return res.status(404).send('Request blocked');
    }
    next();
});

//! Log tất cả các request
// app.use((req, res, next) => {
//     console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
//     next();
// });


// Method-Override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Flash
const session = require("express-session");
const flash = require("express-flash");

app.use(
    session({
        cookie: { maxAge: 60000 },
        secret: "secretKey", // Bạn có thể thay đổi khóa bí mật này
        resave: false,
        saveUninitialized: true,
    })
);
app.use(flash());

// body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// Cookie-Parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Admin
const systemConfig = require("./config/system.js");
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Moment View
const moment = require("moment")
app.locals.moment = moment

//Route
const route = require("./routes/client/index.route.js");
route(app);
const routeAdmin = require("./routes/admin/index.route.js");
routeAdmin(app);

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// .env
require("dotenv").config();
const port = process.env.PORT;

// Mongoose
const database = require("./config/database");
database.connect();

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

// Socket.io
const { Server } = require("socket.io");
const io = new Server(server);
global._io = io;


//! 404
app.use('*', (req, res) => {
    res.render('client/pages/errors/404', {
        pageTitle: '404 - Page Not Found',
    });
});

server.listen(port, () => console.log(`Server đang chạy tại http://localhost:${port}`));
