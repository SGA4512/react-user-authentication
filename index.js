const express = require("express");
const { mongoose } = require("./config/database")
const { userRouter } = require("./api/controllers/UserController")

const app = express()
const port = 3001

app.use(express.json())
app.use("/users", userRouter)

app.listen(port, () => {
    console.log("server setup and running...")
})