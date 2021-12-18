const mongoose = require('mongoose')

mongoDB().catch(err => console.log(err));

async function mongoDB() {
    await mongoose.connect(process.env.MONGO_URI)
}

console.log("Successfully established DB connection to " + process.env.DB_NAME)

module.exports = mongoDB;