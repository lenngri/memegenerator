const ExternalUser = require('../../database/models/externalUser.model')
const User = require('../../database/models/user.model');
const ErrorResponse = require('../../helpers/errorResponse.helper');
const { sendToken } = require('../../helpers/sendToken.helper')

// takes response object from oAuth service and creates user document in DB

exports.externalUserService = async function (req, res, next) {
    const { username, email } = req.body;

    try {

      // checks to see if external registration email already exists in database of plain users
      const checkUser = await User.findOne({email: email})
      if(checkUser) return next(new ErrorResponse('A user with this email address already exists', 400))


      // checks to see if external user already logged in before and sends token if yes
      const externalUser = await ExternalUser.findOne({email: email})
      if(externalUser) return sendToken(externalUser, 200, res)

      // if no external user with this email has been registered, creates new external user and logs them in
      console.log("creating new external user")
      const newExternalUser = await ExternalUser.create({
        username,
        email
      });
  
      return sendToken(newExternalUser, 200, res);

    } catch (error) {
      next(error);
    }
}