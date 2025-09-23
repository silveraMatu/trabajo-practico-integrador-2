import mongoose from "mongoose";

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
        ref: "Tag"
    }
}, {
    timestamps: true,
    toJSON: {virtuals: true}
})

articleSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "article"
})

export const ArticleModel = mongoose.model("Article", articleSchema)