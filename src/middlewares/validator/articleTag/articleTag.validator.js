import { param } from "express-validator";

export const validateArticleTagParam = [
    param("articleId")
        .isMongoId().withMessage("ArticleId debe ser un id de mongo valido"),
    param("tagId")
        .isMongoId().withMessage("tagId debe ser un id de mongo valido"),
]