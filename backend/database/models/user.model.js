//Database model to save Users to the MongoDB Database
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please choose a username. A cool one.']
    },

// Stackoverflow entry explaining email matching regexe: https://stackoverflow.com/questions/15017052/understanding-email-validation-using-javascript
    email: {
        type: String,
        required: [true, 'You forgot to add an email address.'],
        unique: [true, 'This email address is already taken.'],
        match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, 'This is not a valid email format.'],
    },

    password: {
        type: String,
        required: [true, 'Please select a password'],
        minlength: [8, 'Your password must be 8 characters long. You have {VALUE}'],
        select: false,
    },
    // resetPasswordToken: String,
    // resetPasswordExpire: Date,
});

// Blogpost explaining password hashing with mongoose: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
// Blogpost explaining password hashing with mongoose: https://coderrocketfuel.com/article/store-passwords-in-mongodb-with-node-js-mongoose-and-bcrypt#store-a-hashed-password-in-the-database


// Mongoose "pre" middleware function
UserSchema.pre('save', function(next) {
    const user = this;

    // Checks is password is modified or new. If not, password is not hashed again.
    if(this.isModified('password') || this.isNew) {

        // bcrypt function generates salt to prevent bruteforce and rainbow table attacks
        bcrypt.genSalt(saltRounds, function(saltError, salt) {
            if(saltError){
                return next(saltError)
            } else {

                // bcryt hash function hashes password, using salt
                bcrypt.hash(user.password, salt, function(hashError, hash) {
                    if (hashError) {
                        return next(hashErrror)
                    }

                    user.password = hash
                    next()
                })
            }
        })
    } else {
        return next()
    }
});

// If the password is not remodified it is not rehashed
// UserSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//         next();
//     }
//     //Salt is a bcrypt function that takes the password and generates a 10-digit hash
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

//The entered password is compared with the password saved for the user in the database
// UserSchema.methods.matchPasswords = async function (password) {
//     return await bcrypt.compare(password, this.password);
// };

// UserSchema.methods.getResetPasswordToken = function () {
//     return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRE,
//     });
// };

// //Timespan for password reset is limited to 5min
// UserSchema.methods.getResetPasswordToken = function () {
//     const resetToken = crypto.randomBytes(20).toString("hex");

//     this.resetPasswordtoken = crypto
//         .createHash("sha256")
//         .update(resetToken)
//         .digest("hex");
//     this.resetPasswordExpirt = Date.now () + 5 * (60 * 1000);

//     return resetToken;
// };

const User = mongoose.model("User", UserSchema);
module.exports = User;
