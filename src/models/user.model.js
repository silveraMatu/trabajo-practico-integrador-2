import mongoose from "mongoose";

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
    }
}, {
    timestamps: true
})

export const userModel = mongoose.model("User", userSchema)