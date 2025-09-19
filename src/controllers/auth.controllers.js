import { matchedData } from "express-validator";
import { userModel } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt/generateToken.helper.js";

export const register = async(req, res)=>{
    
    const validatedData = matchedData(req)
    
    try {

        //hasheo de password
        const hashedPassword = await hashPassword(validatedData.password)
        validatedData.password = hashedPassword

        const newUser = new userModel(validatedData)

        await newUser.save()

        //guardo los datos que voy a enviar en una constante, excluyendo password
        const {password, ...secureUser} = newUser._doc

        res.status(201).json({ok: true, msg: "Registro exitoso", data: secureUser})

    } catch (e) {
        if(e.code == 11000)
            return res.status(400).json({ok: false, msg: `${Object.keys(e.keyValue)} ya se encuentra en uso`})
        
        res.status(500).json({ok: false, msg: "error interno del servidor"})
    }
}

export const login = async(req, res)=>{
    
    const validatedData = matchedData(req)
    
    try {
        const user = await userModel.findOne({username: validatedData.username})
        if(!user)
            res.status(404).json({ok: false, msg: "usuario no encontrado."})

        //compara la password, si no pasa se va al catch
        await comparePassword(validatedData.password, user.password)

        //access token
        const token = generateToken(
            {
                _id: user._id,
                role: user.role
            })

        //enviamos el token en cookie
        res.cookie("token", token, {
            maxAge: 1000 * 60 * 60,
            httpOnly: true
        })

        const {password, ...secureUser} = user._doc

        res.status(200).json({ok: true, msg: "logueado exitosamente", data: secureUser})
    } catch (e) {
        res.status(e.statusCode || 500).json({ok: false, msg: e.msg || "error interno del servidor"})
    }
}

export const logout = async(req, res)=>{
    try {
        res.clearCookie("token").status(200).json({ok: true, msg: "has cerrado sesión"})
    } catch (e) {
        res.status(500).json({ok: false, msg: "error interno del servidor"})
    }
}