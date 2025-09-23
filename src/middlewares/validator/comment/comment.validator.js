import { body } from "express-validator";

export const createCommentValidation = [
    body("content")
        .isString().withMessage("content debe ser un string")
        .trim()
        .notEmpty().withMessage("content requerido")
        .isLength({min: 5, max:500}).withMessage("content permite desde 5 hasta 500 caracteres"),
    body("author")
        .notEmpty().withMessage("author requerido")
        .isMongoId().withMessage("author debe ser un id de mongo valido"),
    body("article")
        .notEmpty().withMessage("article requerido")
        .isMongoId().withMessage("article debe ser un id de mongo valido")
]