import { UserModel } from "../models/user.model.js"; 
import { matchedData } from "express-validator";

export const getAllUsersWithArticles = async(req, res)=>{
    try {
        //TO-DO. mas adelante validar que no este eliminado logicamente.
       const users = await UserModel.find({}, {username: 1, articles: 1}).populate("articles", "title status")

       if(!users.length)
            return res.status(404).json({ok: false, msg: "no se encontraron usuarios en la db."})
       
       res.status(200).json({ok: true, data: users})
    } catch (e) {
        res.status(e.statusCode || 500).json({ok: false, msg: e.msg || "error interno del servidor"})   
    }
}

export const getUserWithArticles = async(req, res)=>{
    
    const {id} = matchedData(req, {locations: ["params"]})
    
    try {
        
       const user = await UserModel
        .findById(id, {username: 1, articles: 1})
        .populate({
            path: "articles", 
            select: "title status",
            populate: { //traer los comentarios
                path: "comments",
                select: "author content"
            }
        })

        if(!user)
            return res.status(404).json({ok: false, msg: "usuario no encontrado."})

       res.status(200).json({ok: true, data: user})
    } catch (e) {
        res.status(500).json({ok: false, msg:"error interno del servidor"})   
    }
}

export const updateUser = async(req, res)=>{
    
    const validatedData = matchedData(req)
    const {id} = matchedData(req, {locations: ["params"]})
    
    try {

        const user = await UserModel.findById(id)
        if(!user)
            return res.status(404).json({ok: false, msg: "usuario no encontrado"})

        Object.keys(validatedData).forEach(key=>{

            //Al ser profile un subdocumento es necesario iterar sobre sus keys
            //para actualizar valores
            if(key === "profile"){
                Object.keys(validatedData[key]).forEach(k=>
                    {
                        user.profile[k] = validatedData.profile[k]
                    })
            }
            else{
                user[key] = validatedData[key]
            }

        })

        const updatedUser = await user.save()

        res.status(200).json({ok: true, msg: "usuario actualizado", data: updatedUser})
    } catch (e) {
        res.status(500).json({ok: false, msg: "error interno del servidor"})
    }
}

export const deleteUser = async(req, res)=>{
    
    const {id} = matchedData(req, {locations: ["params"]})
    
    try {
        const user = await UserModel.findById(id)
        if(!user)
            res.status(404).json({ok: false, msg: "usuario no encontrado"})

        await user.softDelete() //metodo de instancia para eliminación lógica

        res.status(204).end()
    } catch (error) {
        res.status(500).json({ok: false, msg: "error interno del servidor"})
    }
}