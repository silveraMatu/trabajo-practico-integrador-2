import { Router } from "express";
import { authMiddleware } from "../middlewares/validator/jwt/auth.middleware.js";
import { adminMiddleware } from "../middlewares/validator/authorization/adminMiddleware.js";
import { deleteUser, getAllUsersWithArticles, getUserWithArticles, updateUser } from "../controllers/user.controller.js";
import { applyValidations } from "../middlewares/validator/applyValidations.js";
import { updateUserValidations } from "../middlewares/validator/user/updateUser.validator.js";

export const userRouter = Router()

userRouter.use(authMiddleware)
userRouter.use(adminMiddleware)

userRouter.get("/users", getAllUsersWithArticles )
userRouter.get("/users/:id", getUserWithArticles )
userRouter.put("/users/:id", updateUserValidations, applyValidations, updateUser )
userRouter.delete("/users/:id", deleteUser )