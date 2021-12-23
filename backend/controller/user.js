const User = require('../database/models/user'); // Model for saving a user to the DB

exports.register = async function(req, res, next) {

    const{ username, email, password } = req.body

    try {
        await User.create({
            username: username,
            email: email,
            password: password
        })
        res.status(201).send(`Created user with email: ${email}`)
    } catch(error) {
        res.status(500).send(error.message)
    }
};



