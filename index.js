const express = require("express");
const mongoose = require("./config/database")
const app = express()
const port = 3001

app.listen(port, () => {
    console.log("server setup and running...")
})