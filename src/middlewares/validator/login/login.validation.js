import { body } from "express-validator"

export const loginValidations = [
    body("username")
        .isString().withMessage("username debe ser un string.")
        .trim()
        .notEmpty().withMessage("username es requerido.")
        .isLength({min: 3, max: 50}).withMessage("username permite entre 3 y 50 carácteres."),
     body("password")
        .isString().withMessage("password debe ser un string")
        .trim()
        .notEmpty().withMessage("password requerida")
        .isStrongPassword({minLength: 6, minSymbols: 0, minUppercase: 0}),
    ]