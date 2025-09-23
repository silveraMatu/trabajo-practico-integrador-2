import { matchedData } from "express-validator";
import { CommentModel } from "../models/comment.model.js";
import { UserModel } from "../models/user.model.js";
import { ArticleModel } from "../models/article.model.js";

export const createComment = async(req, res)=>{
    
    const validatedData = matchedData(req)

    try {
        
        const userExist = await UserModel.findById(validatedData.author)
        const articleExist = await ArticleModel.findById(validatedData.article)
        
        if(!userExist || !articleExist)
            return res.status(404).json({ok: false, msg: "el articulo o el usuario no exiten"})
        
        const newComment = new CommentModel(validatedData)

        const savedComment = await newComment.save()

        res.status(201).json({ok: true, msg: "comentario publicado", data: savedComment})
    } catch (e) {
        res.status(500).json({ok: false, msg: "error interno del servidor"})
    }
}

export const getAllCommentsOfArticle = async(req, res)=>{
    
    const {articleId} = matchedData(req)
    
    try {
        const comments = await CommentModel.find({article: articleId}, {content: 1, author: 1}).populate("author", "username")

        if(!comments.length)
            return res.status(404).json({ok: false, msg: "No se encontraron comentarios en este articulo"})

        res.status(200).json({ok: true, data: comments})
    } catch (error) {
        res.status(500).json({ok: false, msg: "error interno del servidor"})
    }
}

export const getMyComments = async(req, res)=>{
    
    const {_id} = req.userData
    
    try {
        const comments = await CommentModel.find({author: _id}, {content: 1})

        if(!comments.length)
            return res.status(404).json({ok: false, msg: "No tienes ningun comentario todavia."})

        res.status(200).json({ok: true, data: comments})
    } catch (error) {
        res.status(500).json({ok: false, msg: "error interno del servidor"})
    }
}

export const updateComment = async(req, res)=>{
    
    const {comment} = req
    const {content} = matchedData(req)
    
    try {
        const updatedComment = await comment.updateOne({content}, {new: true})

        res.status(200).json({ok: false, msg: "comentario actualizado", data: updatedComment})
    } catch (error) {
        res.status(500).json({ok: false, msg: "error interno del servidor"})
    }
}

export const deleteComment = async(req, res)=>{
    
    const {comment} = req
    
    try {
        await comment.deleteOne()

        res.status(204).end()
    } catch (error) {
        res.status(500).json({ok: false, msg: "error interno del servidor"})
    }
}