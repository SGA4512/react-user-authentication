const express = require("express")
const router = express.Router()

const { User } = require("../models/User")
const { authenticateUser } = require("../middlewares/authentication")

router.post("/register", (req, res) => {
    const body = req.body
    const user = new User(body)

    user.save()
        .then(user => res.send(user))
        .catch(err => res.send(err))
})

router.post('/login', function(req, res) {
    const body = req.body

    User.findByCredentials(body.email, body.password)
        .then(user => user.generateToken())
        .then(token =>
            // res.setHeader('x-auth', token).send({})
            res.send(token)
        )
        .catch(err => res.send(err))
})

router.get('/account', authenticateUser, function(req, res){
    const { user } = req
    res.send(user)
})

router.delete('/logout', authenticateUser, function(req, res){
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: {tokens: { token: token }}})
        .then(function(){
            res.send({notice: 'successfully logged out'})
        })
        .catch(function(err){
            res.send(err)
        })
})

module.exports = {
    userRouter: router
}