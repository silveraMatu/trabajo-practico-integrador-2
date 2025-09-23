import mongoose from "mongoose";
import { CommentModel } from "./comment.model.js";

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 200
    },
    content: {
        type: String,
        required: true,
        minLength: 50
    },
    excerpt: {
        type: String,
        maxLength: 500
    },
    status: {
        type: String,
        enum: ["published", "archived"],
        default: "published"
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    tags: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Tag",
        default: []
    }
}, {
    versionKey: false,
    timestamps: true,
    toJSON: {virtuals: true}
})

articleSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "article"
})

//no traer publicaciones archivadas
articleSchema.pre(/^find/, function(next){
    if(this.getFilter().status === undefined)
        this.where({status: "published"})

    next()
})

articleSchema.pre("deleteOne", {document: true}, async function(next){
    await CommentModel.deleteMany({article: this._id})

})

//este unicamente atiende al deleteMany desde el query middleware de user
articleSchema.pre("deleteMany", async function(next){
    const filter = this.getQuery()
    const articles = await this.model.find(filter)

    for (const article of articles){
        await CommentModel.deleteMany({article: article._id})
    }
    next()
})

export const ArticleModel = mongoose.model("Article", articleSchema)