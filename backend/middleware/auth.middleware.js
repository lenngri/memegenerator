const jwt = require("jsonwebtoken");
const User = require("../database/models/user.model");
const ErrorResponse = require("../helpers/errorResponse.helper");

exports.protect = async (req, res, next) => {
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if(!user) {
            return next(new ErrorResponse("No user found with this ID", 404));
        }

        req.user = user;

        next();
    } catch (err) {
        return next(new ErrorResponse("Not authorized to acess this route", 401));
    }
};