import { matchedData } from "express-validator";
import { ArticleModel } from "../models/article.model.js";
import { UserModel } from "../models/user.model.js";

export const createArticle = async(req, res)=>{
    
    const validatedData = matchedData(req)

    try {
        const userExist = await UserModel.findById(validatedData.author)
        if(!userExist)
            return res.status(404).json({ok: false, msg: "ese usuario no existe"})
         
        const newArticle = new ArticleModel(validatedData)

        const savedArticle = await newArticle.save()

        res.status(201).json({ok: true, msg: "articulo creado", data: savedArticle})
    } catch (error) {
        res.status(500).json({ok: false, msg: "error interno del servidor"})
    }
}

export const getAllArticles = async(req, res)=>{
    try {
        const articles = await ArticleModel.find({}, {title: 1, author: 1, tags: 1})
            .populate("author", "username").populate("tags", "name")

        if(!articles.length)
            return res.status(404).json({ok: false, msg: "no se encontraron articles"})

        res.status(200).json({ok: true, data: articles})
    } catch (error) {
        res.status(500).json({ok: false, msg: "error interno del servidor"})
    }
}

export const getArticleById = async(req, res)=>{
   
   const {id} = req.params
   
    try {
        const article = await ArticleModel.findById(id, {title: 1, author: 1, tags: 1})
            .populate("author", "username").populate("tags", "name")

        if(!article)
            return res.status(404).json({ok: false, msg: "no se encontro el article"})

        res.status(200).json({ok: true, data: article})
    } catch (error) {
        console.log(error);
        res.status(500).json({ok: false, msg: "error interno del servidor"})
    }
}

export const getMyArticles = async(req, res)=>{
   
   const {_id} = req.userData
   
    try {
        const articles = await ArticleModel.find({author: _id}, {title: 1})

        if(!articles.length)
            return res.status(404).json({ok: false, msg: "no se encontraron articles de este user"})

        res.status(200).json({ok: true, data: articles})
    } catch (error) {
        console.log(error);
        res.status(500).json({ok: false, msg: "error interno del servidor"})
    }
}

export const updateArticle = async(req, res)=>{
    const {article} = req //enviamos article desde la validacion de ownerOrAdmin para evitar consultar dos veces
    const validatedData = matchedData(req)
    
    try {
        Object.keys(validatedData).forEach(key=>{
            article[key] = validatedData[key]
        })

        const savedArticle = await article.save()
        res.status(200).json({ok: true, msg: "articulo actualizado", data: savedArticle})
    } catch (error) {
        res.status(500).json({ok: false, msg: "error interno del servidor"})
    }
}

export const deleteArticle = async(req, res)=>{
    
    const {article} = req
    
    try {

        //TODO. Agregarle eliminacion en cascada a los comentarios.
        await article.deleteOne()
        res.status(204).end()
    } catch (error) {
        res.status(500).json({ok: false, msg: true})
    }
}