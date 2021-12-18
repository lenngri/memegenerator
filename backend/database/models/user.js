//Database model to save Users to the MongoDB Database

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please insert a username"],
    },

//this article explains the email verification "/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/," https://stackoverflow.com/questions/15017052/understanding-email-validation-using-javascript
    email: {
        type: String,
        required: [true, "Please insert an email address"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
            "Please insert  valid email address",
        ],
    },

    password: {
        type: String,
        required: [true, "Please insert a password"],
        minlength: 8,
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

//If the password is not remodified it is not rehashed
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    //Salt is a bcrypt function that takes the password and generates a 10-digit hash
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//The entered password is compoared with the password saved for the user in the database
UserSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getResetPasswordToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

//Timespan for password reset is limited to 5min
UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordtoken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetPasswordExpirt = Date.now () + 5 * (60 * 1000);

    return resetToken;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
