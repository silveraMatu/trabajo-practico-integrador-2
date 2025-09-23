import { param } from "express-validator";

export const paramValidator = [
    param("id")
        .isMongoId().withMessage("id debe ser un mongoId valido")
]

export const paramArticleIdValidator = [
    param("articleId")
        .isMongoId().withMessage("id debe ser un mongoId valido")
]