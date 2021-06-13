module.exports = {
  authenticatedOnly: (req, res, next) => {
    if (req.session && req.session.user) {
      next();
      return;
    }
    res.redirect("/beautylash/users/login");
  },
  guestOnly: (req, res, next) => {
    if (!req.session || !req.session.user) {
      next();
      return;
    }
  },
  setUserVarMiddleware: (req, res, next) => {
    res.locals.user = null;
    if (req.session && req.session.user) {
      res.locals.user = req.session.user;
    }
    next();
  },
};
