import jwt from "jsonwebtoken"

export const generateToken = (payload)=>{
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    )
    return accessToken
}