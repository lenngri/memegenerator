//Source: https://www.youtube.com/watch?v=JwGcP5RcgQg
const mongoose = require('mongoose')

mongoDB().catch(err => console.log(err));

// requires .env file
async function mongoDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => console.log('Successfully established DB connection'))
    } catch(error) {
        console.error(error.message)
    }
}

module.exports = mongoDB;