const jwt = require("jsonwebtoken");

const genToken = (payload, expDate = "30d") => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      "2r34v09,kij-vt3u45098wm's90845b6mj9084y5",
      { expiresIn: expDate },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    );
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      "2r34v09,kij-vt3u45098wm's90845b6mj9084y5",
      (err, payload) => {
        if (err) reject(err);
        else resolve(payload);
      }
    );
  });
};

module.exports = {
  genToken,
  verifyToken,
};
