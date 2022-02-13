const crypto = require('crypto');
const User = require('../database/models/user.model');
const ErrorResponse = require('../helpers/errorResponse.helper');
const sendEmail = require('../helpers/sendEmail.helper');

const { registerUserService } = require('../service/user/register.user.service');
const { loginUserService } = require('../service/user/login.user.service');
const { externalUserService } = require('../service/user/external.user.service');

exports.register = async function (req, res, next) {
  registerUserService(req, res, next);
};

exports.login = async function (req, res, next) {
  loginUserService(req, res, next);
};

exports.external = async function (req, res, next) {
  externalUserService(req, res, next);
};

exports.forgotpassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse('Email could not be sent', 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    const message = `
            <h1>You have requested a password reset</h1>
            <p>Please click on the following link to reset you password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
            `;
    try {
      await sendEmail({
        to: user.email,
        subject: 'Password Reset Request',
        text: message,
      });

      res.status(200).json({ success: true, data: 'Email sent!' });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse('Email could not be sent!', 500));
    }
  } catch (error) {
    next(error);
  }
};

exports.resetpassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse('Invalid Reset Token', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: 'Password Reset Success',
    });
  } catch (error) {
    next(error);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token: token,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
  });
};
