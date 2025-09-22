import { matchedData } from "express-validator";
import { TagModel } from "../models/tag.model.js";
import { ArticleModel } from "../models/article.model.js";

export const createTag = async(req, res)=>{
    
    const validatedData = matchedData(req)

    try {
        const newTag = new TagModel(validatedData)

        const savedTag = await newTag.save()

        res.status(201).json({ok: true, msg: "tag creado", data: savedTag})
    } catch (e) {
        if(e.code == 11000)
            return res.status(400).json({ok: false, msg: `el tag ${Object.values(e.keyValue)} ya existe.`})

        res.status(500).json({ok: false, msg: "error interno del servidor"})
    }
}
export const getAllTags = async(req, res)=>{
    try {
        const tags = await TagModel.find()
        if(!tags.length)
            return res.status(404).json({ok: false, msg: "no se encontraron tags"})

        res.status(200).json({ok: true, data: tags})
    } catch (error) {
        res.status(500).json({ok: false, msg: "error interno del servidor"})
    }
}

export const getTagById = async(req, res)=>{
    
    const {id} = req.params
    
    try {
        const tag = await TagModel.findById(id).populate(
            {
                path: "articles",
                select: "title"
            })

        if(!tag)
            return res.status(404).json({ok: false, msg: "no se encontro el tag"})

        res.status(200).json({ok: true, data: tag})
    } catch (error) {
        res.status(500).json({ok: false, msg: "error interno del servidor"})
    }
}

export const updateTag = async(req, res)=>{
    
    const {id} = req.params
    const validatedData = matchedData(req)
    
    try {
        const tag = await TagModel.findById(id)

        if(!tag)
            return res.status(404).json({ok: false, msg: "no se encontro el tag"})

        Object.keys(validatedData).forEach(key=>{
            tag[key] = validatedData[key]
        })

        const savedTag = await tag.save()
        res.status(200).json({ok: true, msg: "tag actualizado", data: savedTag})
    } catch (e) {
        if(e.code == 11000)
            return res.status(400).json({ok: false, msg: `el tag ${Object.values(e.keyValue)} ya existe`})
    
        res.status(500).json({ok: false, msg: "error interno del servidor."})
    }
}

export const deleteTag = async(req, res)=>{
    
    const {id} = req.params
    
    try {
        const deleted = await TagModel.deleteOne({_id: id})
        if(!deleted.deletedCount)
            return res.status(404).json({ok: false, msg: "tag no encontrado"})

        res.status(204).end()
    } catch (error) {
        res.status(500).json({ok: false, msg: "error interno del servidor"})
    }
}