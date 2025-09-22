import { body } from "express-validator";

export const updateUserValidations = [
    body("username")
        .optional()
        .isString().withMessage("username debe ser un string.")
        .trim()
        .notEmpty().withMessage("username es requerido.")
        .isLength({min: 3, max: 50}).withMessage("username permite entre 3 y 50 carácteres."),
    body("email")
        .optional()
        .trim()
        .notEmpty().withMessage("email es requerido.")
        .isEmail().withMessage("El email debe tener un formato válido.")
        .toLowerCase(),
    body("password")
        .optional()
        .isString().withMessage("password debe ser un string")
        .trim()
        .notEmpty().withMessage("password requerida")
        .isStrongPassword({minLength: 6, minSymbols: 0, minUppercase: 0}),
    body("role")
        .optional()
        .isString().withMessage("role debe ser un string.")
        .trim()
        .toLowerCase()
        .isIn(["user", "admin"]).withMessage("role solo permite 'user' o 'admin'"),
    body("profile")
        .optional()
        .isObject().withMessage("profile debe ser un objeto."),
    body("profile.firstName")
        .optional()
        .isString().withMessage("firstName debe ser un string")
        .trim()
        .notEmpty().withMessage("firstName requerido")
        .isLength({min: 2, max: 50}),
    body("profile.lastName")
        .optional()
        .isString().withMessage("lastName debe ser un string")
        .trim()
        .notEmpty().withMessage("lastName requerido")
        .isLength({min: 2, max: 50}),
    body("profile.biography")
        .optional()
        .isString().withMessage("biography debe ser un string")
        .trim()
        .isLength({max: 500}).withMessage("biography permite ingresar hasta 500 carácteres."),
    body("profile.avatarUrl")
        .optional()
        .isURL().withMessage("avatar_url debe tener un formato de url válido.")
        .trim(),
    body("profile.birthDate")
        .optional()
        .isDate().withMessage("birthDate debe tener un formato de fecha válido.")
]