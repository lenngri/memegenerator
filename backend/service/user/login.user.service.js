const User = require('../../database/models/user.model')
const ErrorResponse = require('../../helpers/errorResponse.helper')
const { sendToken } = require('../../helpers/sendToken.helper')



exports.loginUserService = async function(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorResponse('Please provide an email and a password', 400));
    }
  
    try {
      const user = await User.findOne({ email }).select('+password');
  
      if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
      }
  
      const isMatch = await user.matchPasswords(password);
  
      if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
      }
  
      sendToken(user, 200, res);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
}