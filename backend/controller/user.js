const crypto = require("crypto"); // Cryptography Library. Source: https://www.npmjs.com/package/crypto-js
const User = require('../database/models/user'); // Model for saving a user to the DB

exports.register = async function(req, res, next) {

    const{ username, email, password } = req.body

    try {
        await User.create({
            username: username,
            email: email,
            password: password
        })
        res.sendStatus(201)
    } catch(e) {
        res.sendStatus(500)
    }
};



