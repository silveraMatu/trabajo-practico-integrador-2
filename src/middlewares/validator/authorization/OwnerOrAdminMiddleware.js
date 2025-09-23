import { ArticleModel } from "../../../models/article.model.js"
import { CommentModel } from "../../../models/comment.model.js"


//midleware tanto para article como para comment
export const ownerOrAdminMiddleware = async(req, res, next)=>{
    const {_id, role} = req.userData
    const {id} = req.params
    const {articleId} = req.params

    // if(req.path.startsWith("/articles")){
    //     const article = await ArticleModel.findOne({_id: id})
    //     if(!article)
    //        return res.status(404).json({ok: false, msg: "article no encontrado"})
    //     if(article.author != _id && role !== "admin")
    //         return res.status(403).json({ok: false, msg: "solo el autor o un admin puede realizar esta acción."})

    //     req.article = article
    // } 
    // else if(req.path.startsWith("/comments")){
    //     const comment = await CommentModel.findOne({_id: id})
    //     if(!comment)
    //        return res.status(404).json({ok: false, msg: "comment no encontrado"})
    //     if(comment.author != _id && role !== "admin")
    //         return res.status(403).json({ok: false, msg: "solo el autor o un admin puede realizar esta acción."})

    //     req.comment = comment
    // }

    // next()

    const models = {
        articles: ArticleModel, 
        comments: CommentModel 
    }

    const key = req.path.split("/")[1] //key tomara articles o comments dependiendo como se pase en el endpoint
    const model = models[key]

    let resource
    
    if(articleId){
        resource = await model.findById(articleId) //por si en vez de id me mandan articleId

    }else{
        resource = await model.findById(id) //esto hace una query el modelo de article o comment dependiendo del endpoint
    }

    if(!resource)
        return res.status(404).json({ok: false, msg: `${key.slice(0, -1)} no ha sido encontrado.}`})

    if(resource.author !== _id && role !== "admin")
        return res.status(403).json({ok: false, msg: "solo el autor o un admin puede realizar esta accion"})

    req[key.slice(0, -1)] = resource //esto puede ser req.article o req.comment

    next()
}

//Este refactor lo hice debido a que el middleware anterior me parecia redundante. Igual lo dejo comentado, por las dudas.