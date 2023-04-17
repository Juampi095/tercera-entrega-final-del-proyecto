import passport from "passport";
import CustomError from "../services/errors/CustomError";
import EErrors from "../services/errors/enums";

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user) {
      if (err) return next(err);
      if (!user) {
        return res
          .status(401)
          .json({ status: "error", error: "Invalid credentials" });
      }

      req.user = user;
      next();
    })(req, res, next);
  };
};

export const viewsPassportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user) {
      if (err) return next(err);
      if (!user) {
        return res
          .status(401)
          .render("errors/base", { error: "Invalid credentials" });
      }

      req.user = user;
      next();
    })(req, res, next);
  };
};

export const authorization = (role) => {
  return async (req, res, next) => {
    const user = req.user || null;

    if (!user)
      CustomError({
        name: "Authentication Error",
        cause: generateAuthenticationError(),
        message: "Error trying to find user.",
        code: EErrors.AUTHENTICATION_ERROR,
      });
    if (user.role !== role)
      return res.status(403).json({ status: "error", error: "Unauthorized" });
    next();
  };
};

export const viewsAuthorization = (role) => {
  return async (req, res, next) => {
    const user = req.user || null;

    if (!user) return res.status(401).redirect("/login");
    if (user.role !== role)
      return res
        .status(403)
        .render("errors/base", { error: "Not authorized", user });
    next();
  };
};
