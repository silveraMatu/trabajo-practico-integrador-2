import { Router } from "express";
import { authMiddleware } from "../middlewares/validator/jwt/auth.middleware.js";
import { ownerOrAdminMiddleware } from "../middlewares/validator/authorization/OwnerOrAdminMiddleware.js";
import { addTagAnArticle, deleteTagOfArticle } from "../controllers/articleTag.controllers.js";
import { validateArticleTagParam } from "../middlewares/validator/articleTag/articleTag.validator.js";
import { applyValidations } from "../middlewares/validator/applyValidations.js";

export const articleTagRouter = Router()

articleTagRouter.use(authMiddleware)

articleTagRouter.post("/articles/:articleId/tags/:tagId", validateArticleTagParam, applyValidations, ownerOrAdminMiddleware, addTagAnArticle )
articleTagRouter.delete("/articles/:articleId/tags/:tagId",validateArticleTagParam, applyValidations, ownerOrAdminMiddleware, deleteTagOfArticle )