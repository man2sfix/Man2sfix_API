const jwt = require('jsonwebtoken');
const errorHelper = require('./errorHelper');

const TOKEN_SECRET = 'SECRET';

// Generate Token
exports.tokenGenerator = function (result) {
  const resultData = result;

  return jwt.sign(resultData, TOKEN_SECRET, {
    algorithm: 'HS256',
    expiresIn: 60 * 60, // 1hour
  });
};

// isAuthenticated
exports.isAuthenticated = function (token) {
  const result = jwt.verify(token, TOKEN_SECRET, (err, decode) => {
    if (err) {
      return {
        logined: false,
      };
    }

    const exp = new Date(decode.exp * 1000);
    const now = Date.now();

    if (now < exp) {
      return {
        logined: true,
        userInfo: decode,
      };
    }

    return {
      logined: false,
    };
  });

  return result;
};

// Ensure Authorized
exports.ensureAuthorized = function (req, res, next) {
  // set error
  const err = errorHelper(401);

  // request header
  const authorization = req.headers.authorization || req.headers.Authorization;

  if (!authorization) {
    next(err);
  } else {
    const authorizationToken = authorization.split(' ')[1] || null;
    const isAuthenticated = authorizationToken ? module.exports.isAuthenticated(authorizationToken) : null;

    if (isAuthenticated.logined) {
      next();
    } else {
      next(err);
    }
  }
};
