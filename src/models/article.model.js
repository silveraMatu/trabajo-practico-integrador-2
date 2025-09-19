import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 3,
        maxLength: 200
    },
    content: {
        type: String,
        minLength: 50
    },
    excerpt: {
        type: String,
        manLength: 500
    },
    status: {
        type: String,
        enum: ["published", "archived"],
        default: "published"
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    tags: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Tag"
    }
}, {
    timestamps: true
})

export const ArticleModel = mongoose.model("Article", articleSchema)