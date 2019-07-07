const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate: {
            validator: function(value) {
                return validator.isEmail(value)
            },
            message: function() {
                return 'invalid email format'
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128
    },
    tokens: [
        {
            token: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }
    ]
})

// pre-hook --> before you save the user in db, you need to encrypt user password.
userSchema.pre("save", function(next){
    const user = this
    if(user.isNew) {
        bcryptjs.genSalt(10)
            .then(salt => {
                bcryptjs.hash(user.password, salt)
                    .then(encryptedPassword => {
                        user.password = encryptedPassword
                        next()
                    })
            })
    } else {
        next()
    }
})

// static method to findByCredentials 
userSchema.statics.findByCredentials = function(email, password) {
    const User = this
    return User.findOne({ email })
                .then(user => {
                    // console.log("credential", user) --> if email is wrong it returns a null --> !null = true
                    if(!user){
                        return Promise.reject('invalid email / password')
                    }

                    return bcryptjs.compare(password, user.password)
                        .then(result => {
                            // console.log(result) --> bcryptjs.compare returns true/false
                            if(result) {
                                return Promise.resolve(user)
                            } else {
                                return Promise.reject("invalid email / password")
                            }
                        })
                })
                .catch(err => Promise.reject(err))
}

// instance method to generateToken
userSchema.methods.generateToken = function(){
    const user = this
    const tokenData = {
        _id: user._id,
        username: user.username,
        createdAt: Number(new Date())
    }

    const token = jwt.sign(tokenData, 'jwt@123')
    user.tokens.push({ token }) // es6 concise property

    return user.save()
        .then(user => Promise.resolve(token))
        .catch(err => Promise.reject(err))
}

userSchema.statics.findByToken = function(token) {
    const User = this
    try {
        tokenData = jwt.verify(token, "jwt@123")
    } catch(err) {
        return Promise.reject(err)
    }

    return User.findOne({
        _id: tokenData._id,
        "tokens.token": token
    })
}

const User = mongoose.model("User", userSchema)

module.exports = {
    User
}