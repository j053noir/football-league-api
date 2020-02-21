const { sign, verify } = require('jsonwebtoken');

const config = require.main.require('./server/config');

const signToken = (payload, expiresIn = '1h') => sign(payload, config.token.secret, {
  algorithm: 'HS256',
  expiresIn,
});

const auth = (req, res, next) => {
  let token = req.headers.authorization || req.query.token || req.body.token;
  const message = 'Unathorized';

  if (!token) {
    next({
      success: false,
      message,
      statusCode: 401,
      type: 'info',
    });
  } else {
    token = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

    verify(token, config.token.secret, (err, decoded) => {
      if (err) {
        next({
          success: false,
          message,
          statusCode: 401,
          type: 'info',
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
};

const owner = (req, res, next) => {
  const { decoded = {}, params = {} } = req;
  const { _id = null } = decoded;
  const { id } = params;

  if (_id !== id) {
    const message = 'Forbidden';

    next({
      success: false,
      message,
      statusCode: 403,
      type: 'warn',
    });
  } else {
    next();
  }
};

const admin = (req, res, next) => {
  const { decoded = {} } = req;
  const { role = null } = decoded;

  if (role !== 'admin') {
    const message = 'Forbidden';

    next({
      success: false,
      message,
      statusCode: 403,
      type: 'warn',
    });
  } else {
    next();
  }
};

module.exports = {
  signToken,
  auth,
  owner,
  admin,
};
