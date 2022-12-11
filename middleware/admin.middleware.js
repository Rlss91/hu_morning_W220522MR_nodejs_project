module.exports = (req, res, next) => {
  if (req.userData && req.userData.isAdmin) {
    next();
  } else {
    res.status(401).json({ error: "invalid permissions" });
  }
};
