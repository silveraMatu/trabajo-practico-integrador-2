import mongoose from "mongoose";

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
    timestamps: true
})

tagSchema.virtual("articles", {
    ref: "Article",
    localField: "_id",
    foreignField: "tags"
})

export const TagModel = mongoose.model("Tag", tagSchema)