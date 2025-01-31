const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
  const origion = req.headers.origin;

  if (allowedOrigins.includes(origion)) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, GET, POST, DELETE, OPTIONS'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
  }
  next();
};

module.exports = credentials;
