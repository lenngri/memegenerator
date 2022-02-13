const jwt = require("jsonwebtoken");
const jwks = require("jwks-rsa");
const User = require("../database/models/user.model");
const ErrorResponse = require("../helpers/errorResponse.helper");

const client = jwks({
    // JWKS url from the Auth0 Tenant
  jwksUri: "https://dev-ttc1u0sj.us.auth0.com/.well-known/jwks.json",
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  requestHeaders: {}, // Optional
  timeout: 30000 //
});

exports.protect = async (req, res, next) => {
  let token = null;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  if (req.body.authOrigin === "local") {
    console.log("attempting to authenticate local user");

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded)

      const user = await User.findById(decoded.id);

      if (!user) {
        return next(new ErrorResponse("No user found with this ID", 404));
      }

      req.user = user;

      next();
    } catch (err) {
      return next(
        new ErrorResponse("Not authorized to access this route", 401)
      );
    }
  }

  if (req.body.authOrigin === "external") {
    console.log("attempting to authenticate external user");

    var decoded = jwt.decode(token, {complete: true})
    const kid = decoded.header.kid

    try {
      
        const signingKey = await client.getSigningKey(kid)
        const secret = signingKey.publicKey || signingKey.rsaPublicKey
    
        const verified = jwt.verify(token, secret, {
        audience: "burrito-memes",
        issuer: "https://dev-ttc1u0sj.us.auth0.com/",
    });

      console.log("verified:", verified)

      //const user = await ExternalUser.findOne({email: req.body.email});

    //   if (!user) {
    //     return next(new ErrorResponse("No user found with this ID", 404));
    //   }

    //   req.user = user;

      if(verified) next();
    } catch (err) {
      return next(
        new ErrorResponse("Not authorized to access this route", 401)
      );
    }
  }
};
