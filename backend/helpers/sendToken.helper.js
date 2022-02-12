exports.sendToken = function (userObject, statusCode, res) {
  const token = userObject.getSignedToken();
  const user = userObject.toJSON()
  delete user.password
  res.status(statusCode).json({
    success: true,
    token: token,
    user: user
  });
};
