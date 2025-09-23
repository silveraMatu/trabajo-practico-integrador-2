import { body } from "express-validator";

export const createArticleValidations = [
    body("title")
        .isString().withMessage("title debe ser un string")
        .trim()
        .notEmpty().withMessage("title requerido")
        .isLength({min: 3, max: 200}),
    body("content")
        .isString().withMessage("content debe ser un string")
        .trim()
        .notEmpty().withMessage("content requerido")
        .isLength({min: 50}),
    body("excerpt")
        .optional()
        .isString().withMessage("excerpt debe ser un string")
        .trim()
        .isLength({max: 500}),
    body("status")
        .optional()
        .trim()
        .toLowerCase()
        .isString().withMessage("status debe ser un string")
        .isIn(["published", "archived"]).withMessage("status admite los valores published y archived"),
    body("author")
        .trim()
        .notEmpty().withMessage("author requerido")
        .isMongoId().withMessage("author debe ser un id de mongo valido"),
    body("tags")
        .optional()
        .trim()
        .isMongoId().withMessage("tags debe ser un mongoId valido")
]