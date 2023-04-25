import passport from "passport";
import CustomError from "../services/errors/CustomError";
import { generateAuthenticationError } from "../services/errors/info";
import EErrors from "../services/errors/enums";
import { logger } from "./logger.js";

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user) {
      if (err) return next(err);
      if (!user) {
        logger.error("Invalid credentials.");
        return res
          .status(401)
          .json({ status: "error", error: "Invalid credentials." });
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
          .render("errors/default", { error: "Invalid credentials." });
      }

      req.user = user;
      next();
    })(req, res, next);
  };
};

export const authorization = (roles) => {
  return async (req, res, next) => {
    const user = req.user || null;

    if (!user)
      CustomError({
        name: "Authentication error",
        cause: generateAuthenticationError(),
        message: "Invalid credentials.",
        code: EErrors.AUTHENTICATION_ERROR,
      });
    if (!roles.includes(user.role))
      return res.status(403).json({ status: "error", error: "Unauthorized." });
    next();
  };
};

export const viewsAuthorization = (roles) => {
  return async (req, res, next) => {
    const user = req.user || null;

    if (!user) return res.status(401).redirect("/login");
    if (!roles.includes(user.role))
      return res
        .status(403)
        .render("errors/default", { error: "Not authorized.", user });
    next();
  };
};
