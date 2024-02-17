const express = require("express");
const morgan = require("morgan")
const dotenv = require("dotenv")
const {connectDB} = require('./db');
const userRoute = require("./routes/user.route")
const accountRoute = require("./routes/account.route")
const cors = require("cors")

dotenv.config()
const PORT = process.env.PORT
const app = express()
connectDB()
app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())


app.use("/api/v1/user", userRoute)
app.use("/api/v1/account", accountRoute)

app.listen(PORT, function(){
    console.log(`Server initialised at ${PORT}`)
})