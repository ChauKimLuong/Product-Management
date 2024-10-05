// Express
const express = require("express");
const app = express();

const path = require('path');

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

app.listen(port, () => console.log(`Example app listening on port ${port}`));