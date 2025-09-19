// 4. Comment (Comentario) - Nuevo modelo
// ● _id (ObjectId automático)
// ● content (String, 5-500 caracteres)
// ● author (ObjectId, referencia a User)
// ● article (ObjectId, referencia a Article - relación 1:N)
// ● createdAt (Date)
// ● updatedAt (Date)

import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        maxLength: 500,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article"
    },
}, {
    timestamps: true
})

export const commentModel = mongoose.model("Comment", commentSchema)