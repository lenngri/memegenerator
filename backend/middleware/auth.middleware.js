const jwt = require("jsonwebtoken");
const jwks = require("jwks-rsa");
const axios = require('axios')
const User = require("../database/models/user.model");
const ExternalUser = require("../database/models/externalUser.model")
const ErrorResponse = require("../helpers/errorResponse.helper");

const client = jwks({
  // JWKS url from the Auth0 Tenant
  jwksUri: "https://dev-ttc1u0sj.us.auth0.com/.well-known/jwks.json",
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  requestHeaders: {}, // Optional
  timeout: 30000, //
});

exports.protect = async (req, res, next) => {
  let token = null;

  console.log(req.headers)

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.json(401).json({success: false});
  }

  if (req.headers.authorigin === "local") {
    console.log("attempting to authenticate local user");

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);

      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(404).json({success: false});
      }

      req.user = user;

      res.status(200).json({success: true});
    } catch (err) {
      return res.json(401).json({success: false})
    }
  }

  if (req.headers.authorigin === "external") {
    console.log("attempting to authenticate external user");

    // console.log(req.headers)

    // if (token) {
    //   var decoded = jwt.decode(token, { complete: true });
    //   const kid = decoded.header.kid;
    // } else {
    //   return res.status(401).json("jwt decode failed")
    // }

    try {
      // const signingKey = await client.getSigningKey(kid);
      // const secret = signingKey.publicKey || signingKey.rsaPublicKey;

      // const verified = jwt.verify(token, secret, {
      //   audience: "burrito-memes",
      //   issuer: "https://dev-ttc1u0sj.us.auth0.com/",
      // });

      // const requestConfig = {
      //   headers: { Authorization: `Bearer ${token}` }
      // };

      const response = await axios.get("https://dev-ttc1u0sj.us.auth0.com/userinfo", requestConfig)
      console.log("response: ", response)

      const externalUser = await response.data

      const email = externalUser.email.toString()
      console.log(email)

      const user = await ExternalUser.findOne({email: externalUser.email});
      console.log(user)

      if (!user) {
        return res.status(404).json({success: false});
      }

      req.user = user;

      return res.status(200).json({success: true})
    } catch (err) {
      return res.status(401).json({success: false})
    }
  }
};
