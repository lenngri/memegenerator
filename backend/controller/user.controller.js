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
