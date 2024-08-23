// Express
const express = require("express");
const app = express();

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

// Body-Parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// Admin
const systemConfig = require("./config/system.js");
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Route
const route = require("./routes/client/index.route.js");
route(app);
const routeAdmin = require("./routes/admin/index.route.js");
routeAdmin(app);

// .env
require("dotenv").config();
const port = process.env.PORT;

// Mongoose
const database = require("./config/database");
database.connect();

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

console.log('Cloud Name:', process.env.CLOUD_NAME);
console.log('API Key:', process.env.CLOUD_API_KEY);
console.log('API Secret:', process.env.CLOUD_API_SECRET);


app.listen(port, () => console.log(`Example app listening on port ${port}`));
