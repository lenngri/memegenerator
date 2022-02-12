const ExternalUser = require('../../database/models/externalUser.model')
const User = require('../../database/models/user.model');
const ErrorResponse = require('../../helpers/errorResponse.helper');
const { sendToken } = require('../../helpers/sendToken.helper')

// takes response object from oAuth service and creates user document in DB

exports.registerExternalService = async function (req, res, next) {
    const { username, email } = req.body;

    // checks to see if external registration email already exists in database of plain users

    try {

      const checkUser = await User.findOne({email: email})
      if(checkUser) return next(new ErrorResponse('A user with this email address already exists', 400))

      const externalUser = await ExternalUser.create({
        username,
        email
      });
  
      sendToken(externalUser, 200, res);
    } catch (error) {
      next(error);
    }
}