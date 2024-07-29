const express = require("express")
const app = express()

const route = require("./routes/client/index.route.js")
route(app)
const routeAdmin = require("./routes/admin/index.route.js")
routeAdmin(app)


require("dotenv").config() // Trước Database 
const port = process.env.PORT

const database = require("./config/database")
database.connect()




app.set("views", "./views")
app.set("view engine", "pug")

app.use(express.static("public"))

app.listen(port, () => console.log(`Example app listening on port ${port}`))
