const User = require('../../database/models/user.model')
const { sendToken } = require('../../helpers/sendToken.helper')

exports.registerUserService = async function (req, res, next) {
    const { username, email, password } = req.body;

    try {
      const user = await User.create({
        username,
        email,
        password,
      });
  
      sendToken(user, 200, res);
    } catch (error) {
      next(error);
    }
}