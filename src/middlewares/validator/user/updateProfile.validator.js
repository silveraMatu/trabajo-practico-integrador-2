import { body } from "express-validator";

export const updateProfileValidations = [
 body("firstName")
        .optional()
        .isString().withMessage("firstName debe ser un string")
        .trim()
        .notEmpty().withMessage("firstName requerido")
        .isLength({min: 2, max: 50}),
        body("lastName")
        .optional()
        .isString().withMessage("lastName debe ser un string")
        .trim()
        .notEmpty().withMessage("lastName requerido")
        .isLength({min: 2, max: 50}),
    body("biography")
        .optional()
        .isString().withMessage("biography debe ser un string")
        .trim()
        .isLength({max: 500}).withMessage("biography permite ingresar hasta 500 carácteres."),
    body("avatarUrl")
        .optional()
        .isURL().withMessage("avatar_url debe tener un formato de url válido.")
        .trim(),
    body("birthDate")
        .optional()
        .isDate().withMessage("birthDate debe tener un formato de fecha válido.")
]