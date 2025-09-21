import { body } from "express-validator";

export const tagCreateValidation = [
    body("name")
        .isString().withMessage("nombre debe ser un string")
        .trim()
        .notEmpty().withMessage("name es requerido")
        .isLength({min: 2, max: 30})
        .custom((value)=>{
            const regex = /^\S+$/
            if(regex.test(value))
                throw new Error("name no debe contener espacios.")
            return true
        }),
    body("description")
        .optional()
        .isString().withMessage("description debe ser un string")
        .trim()
        .isLength({max: 200})
]