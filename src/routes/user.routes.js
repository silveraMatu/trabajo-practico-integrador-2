import { Router } from "express";
import { authMiddleware } from "../middlewares/validator/jwt/auth.middleware.js";
import { adminMiddleware } from "../middlewares/validator/authorization/adminMiddleware.js";
import { deleteUser, getAllUsersWithArticles, getUserWithArticles, updateUser } from "../controllers/user.controller.js";
import { applyValidations } from "../middlewares/validator/applyValidations.js";
import { updateUserValidations } from "../middlewares/validator/user/updateUser.validator.js";
import { paramValidator } from "../middlewares/param.validator.js";

export const userRouter = Router()

userRouter.use(authMiddleware)

userRouter.get("/users",adminMiddleware, getAllUsersWithArticles )
userRouter.get("/users/:id",paramValidator, applyValidations, adminMiddleware, getUserWithArticles )
userRouter.put("/users/:id", paramValidator, updateUserValidations, adminMiddleware, applyValidations, updateUser )
userRouter.delete("/users/:id", paramValidator, applyValidations,adminMiddleware, deleteUser )