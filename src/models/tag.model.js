import mongoose from "mongoose";
import { ArticleModel } from "./article.model.js";

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 2,
        maxLength: 30
    },
    description: {
        type: String,
        maxLength: 200
    }
}, {
    versionKey: false,
    timestamps: true,
    toJSON: {virtuals: true}
})

tagSchema.virtual("articles", {
    ref: "Article",
    localField: "_id",
    foreignField: "tags"
})

tagSchema.pre("deleteOne", async function(next){

    const doc = await this.model.findOne(this.getQuery())
    
    if(!doc) return next()

    await ArticleModel.updateMany(
        {
            tags: doc._id
        }, 
        {
            $pull: {tags: doc._id}
        })
    
    next()

})

export const TagModel = mongoose.model("Tag", tagSchema)