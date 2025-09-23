import { Router } from "express";
import { createArticle, deleteArticle, getAllArticles, getArticleById, getMyArticles, updateArticle } from "../controllers/article.controllers.js";
import { createArticleValidations } from "../middlewares/validator/article/article.validator.js";
import { applyValidations } from "../middlewares/validator/applyValidations.js";
import { authMiddleware } from "../middlewares/validator/jwt/auth.middleware.js";
import { ownerOrAdminMiddleware } from "../middlewares/validator/authorization/OwnerOrAdminMiddleware.js";
import { updateArticleValidations } from "../middlewares/validator/article/updateArticle.validator.js";
import { paramValidator } from "../middlewares/param.validator.js";

export const articleRouter = Router()

articleRouter.use(authMiddleware)

articleRouter.post("/articles", createArticleValidations, applyValidations, createArticle)
articleRouter.get("/articles", getAllArticles)
articleRouter.get("/articles/my", getMyArticles)
articleRouter.get("/articles/:id",paramValidator, applyValidations, getArticleById)
articleRouter.put("/articles/:id",paramValidator, updateArticleValidations, applyValidations, ownerOrAdminMiddleware, updateArticle )
articleRouter.delete("/articles/:id", paramValidator, applyValidations, ownerOrAdminMiddleware, deleteArticle )