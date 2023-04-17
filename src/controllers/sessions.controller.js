import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";
import { generateAuthenticacionError } from "../services/errors/info.js";

/////////////////////////CREAR USERS EN DB

export const register = async (req, res) => {
  res.json({ status: "success", payload: req.user });
};

/////////////////////////FAIL REGISTER

export const failRegister = async (req, res) => {
  res.json({ status: "error", error: "Registro fallido" });
};

/////////////////////////LOGIN

export const login = async (req, res) => {
  const user = req.user;

  if (!user)
    return res
      .status(400)
      .json({ status: "error", error: "Credenciales inválidas" });

  res
    .cookie("cookieToken", req.user.token)
    .json({ status: "success", payload: user });
};

/////////////////////////FAIL LOGIN

export const failLogin = (req, res) => {
  res.json({ status: "error", error: "Login fallido" });
};

/////////////////////////CERRAR SESSION

export const logout = (req, res) => {
  res
    .clearCookie("cookieToken")
    .send({ status: "success", payload: "Sesión cerrada" });
};

/////////////////////////PERFIL DEL USER

export const getUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user)
      CustomError.createError({
        name: "Authentication error",
        casue: generateAuthenticacionError(),
        message: "Error trying to find user",
        code: EErrors.AUTHENTICATION_ERROR,
      });
    res.json({ status: "success", payload: user });
  } catch (error) {
    req.logger.error(error);
    res.json({ status: "Error...", error });
  }
};
