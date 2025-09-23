import { matchedData } from "express-validator";
import { TagModel } from "../models/tag.model.js";

export const addTagAnArticle = async(req, res)=>{
    const {article} = req
    const {tagId} = matchedData(req)
    try {
        const tagExist = await TagModel.findById(tagId)
        if(!tagExist)
            return res.status(404).json({ok: false, msg: "ese tag no ha sido encontrado"})
        
        if(article.tags.includes(tagId))
            return res.status(400).json({ok: false, msg: "el articulo ya tiene ese tag"})

        article.tags.push(tagId)

        const savedArticle = await article.save()

        res.status(200).json({ok: true, msg: "se agrego el tag", data: savedArticle.tags})

    } catch (error) {
        res.status(500).json({ok: false, msg: "error interno del servidor"})
    }
}

export const deleteTagOfArticle = async(req, res)=>{
    const {article} = req
    const {tagId} = matchedData(req)
    try {
        const tagExist = await TagModel.findById(tagId)
        if(!tagExist)
            return res.status(404).json({ok: false, msg: "ese tag no ha sido encontrado"})
        
        if(!article.tags.includes(tagId))
            return res.status(400).json({ok: false, msg: "el articulo no cuenta con ese tag"})

        let index = article.tags.indexOf(tagId)
        
        article.tags.splice(index)

        const savedArticle = await article.save()

        res.status(200).json({ok: true, msg: `se elimino el tag ${tagExist.name} del articulo`, data: savedArticle.tags})

    } catch (error) {
        res.status(500).json({ok: false, msg: "error interno del servidor"})
    }
}