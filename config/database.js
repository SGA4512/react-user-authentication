const mongoose = require("mongoose")

const URI = "mongodb://localhost:27017/react-user-auth"

mongoose.Promise = global.Promise

mongoose.set("useCreateIndex", true)
mongoose.set("useFindAndModify", false)
mongoose.connect(URI, { useNewUrlParser: true })
    .then(() => { console.log("database setup and connected...")})
    .catch(err => { console.log("error in connecting db...")})

module.exports = {
    mongoose
}