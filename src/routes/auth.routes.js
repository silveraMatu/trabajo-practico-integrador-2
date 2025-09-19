import { Router } from "express";
import { getProfile, login, logout, register } from "../controllers/auth.controllers.js";
import { userValidations } from "../middlewares/validator/user/user.validator.js";
import { applyValidations } from "../middlewares/validator/applyValidations.js";
import { loginValidations } from "../middlewares/validator/login/login.validation.js";
import { authMiddleware } from "../middlewares/validator/jwt/auth.middleware.js";

export const authRouter = Router()

authRouter.post("/auth/register", userValidations, applyValidations, register)
authRouter.post("/auth/login", loginValidations, applyValidations, login)
authRouter.post("/auth/logout", authMiddleware, logout)
authRouter.get("/auth/profile", authMiddleware, getProfile)
