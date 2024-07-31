// Express
const express = require("express")
const app = express()

// Admin
const systemConfig = require("./config/system.js")
app.locals.prefixAdmin = systemConfig.prefixAdmin

//Route
const route = require("./routes/client/index.route.js")
route(app)
const routeAdmin = require("./routes/admin/index.route.js")
routeAdmin(app)

// .env
require("dotenv").config() // Trước Database 
const port = process.env.PORT

// Mongoose
const database = require("./config/database")
database.connect()

app.set("views", "./views")
app.set("view engine", "pug")

app.use(express.static("public"))

app.listen(port, () => console.log(`Example app listening on port ${port}`))
