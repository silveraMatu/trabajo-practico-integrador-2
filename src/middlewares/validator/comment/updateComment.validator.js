import { body } from "express-validator";

export const updateCommentValidation = [
    body("content")
        .optional()
        .isString().withMessage("content debe ser un string")
        .trim()
        .notEmpty().withMessage("content requerido")
        .isLength({min: 5, max:500}).withMessage("content permite desde 5 hasta 500 caracteres")
]