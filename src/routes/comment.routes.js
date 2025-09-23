import { Router } from "express";
import { createCommentValidation } from "../middlewares/validator/comment/comment.validator.js";
import { applyValidations } from "../middlewares/validator/applyValidations.js";
import { createComment, deleteComment, getAllCommentsOfArticle, getMyComments, updateComment } from "../controllers/comment.controllers.js";
import { authMiddleware } from "../middlewares/validator/jwt/auth.middleware.js";
import { updateCommentValidation } from "../middlewares/validator/comment/updateComment.validator.js";
import { ownerOrAdminMiddleware } from "../middlewares/validator/authorization/OwnerOrAdminMiddleware.js";
import { paramArticleIdValidator, paramValidator } from "../middlewares/param.validator.js";

export const commentRouter = Router()

commentRouter.use(authMiddleware)

commentRouter.post("/comments", createCommentValidation, applyValidations, createComment)
commentRouter.get("/comments/article/:articleId", paramArticleIdValidator, applyValidations, getAllCommentsOfArticle)
commentRouter.get("/comments/my", getMyComments)
commentRouter.put("/comments/:id", paramValidator,updateCommentValidation, applyValidations, ownerOrAdminMiddleware, updateComment)
commentRouter.delete("/comments/:id", paramValidator, applyValidations, ownerOrAdminMiddleware, deleteComment)