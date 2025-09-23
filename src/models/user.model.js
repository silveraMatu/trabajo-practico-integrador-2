import mongoose from "mongoose";
import { hashPassword } from "../helpers/bcrypt/bcrypt.helper.js";
import { ArticleModel } from "./article.model.js";
import { CommentModel } from "./comment.model.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    profile: {
        firstName: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 50
        },
        lastName: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 50
        },
        biography: {
            type: String,
            maxLength: 500
        },
        avatarUrl:{
            type: String
        },
        birthDate: {
            type: Date
        }
    },
    deletedAt:{
        type: Date,
        default: null
    }
}, {
    versionKey: false,
    timestamps: true,
    toJSON: {virtuals: true}
})


userSchema.virtual("articles", {
    ref: "Article",
    localField: "_id",
    foreignField: "author"
})


//metodo de eliminación lógica
userSchema.methods.softDelete = async function softDelete() {
    return await this.updateOne({deletedAt: Date.now()})
}


//middleware para el hash de password

userSchema.pre("save", {document: true}, async function(next){
    this.password = await hashPassword(this.password)
    next()
})

//middleware para evitar q los finders me traigan usuarios eliminados logicamente

userSchema.pre(/^find/, function(next){
    
    if(this.getFilter().deletedAt === undefined){
        this.where({deletedAt: null})
    }
    next()
})

userSchema.pre("updateOne", {document: true}, async function(next){
    
    await ArticleModel.deleteMany({author: this._id})

    await CommentModel.deleteMany({author: this._id})

    next()
})
export const UserModel = mongoose.model("User", userSchema)