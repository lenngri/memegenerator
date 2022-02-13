const ExternalUser = require('../../database/models/externalUser.model')
const User = require('../../database/models/user.model');
const ErrorResponse = require('../../helpers/errorResponse.helper');
const { sendToken } = require('../../helpers/sendToken.helper')

// takes response object from oAuth service and creates user document in DB

exports.externalUserService = async function (req, res, next) {
  console.log(req.body)
    const username = req.body.nickname
    const email = req.body.email

    try {

      // checks to see if external registration email already exists in database of plain users
      const checkUser = await User.findOne({email: email})
      console.log("check user: ", checkUser)
      if(checkUser) return next(new ErrorResponse('A user with this email address already exists', 400))


      // checks to see if external user already logged in before and sends token if yes
      const externalUser = await ExternalUser.findOne({email: email})
      console.log("External User: ", externalUser)
      if(externalUser) return res.status(200).json(externalUser)

      // if no external user with this email has been registered, creates new external user and logs them in
      console.log("creating new external user")
      const newExternalUser = await ExternalUser.create({
        username,
        email
      });
  
      return res.status(200).json(newExternalUser)

    } catch (error) {
      next(error);
    }
}