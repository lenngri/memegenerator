const mongoose = require('mongoose')

mongoDB().catch(err => console.log(err));

async function mongoDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI) // requires .env file
        console.log('Successfully established DB connection')
    } catch(error) {
        console.error(error.message)
    }
}

module.exports = mongoDB;