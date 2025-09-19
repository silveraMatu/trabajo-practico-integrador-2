import bcrypt from "bcryptjs";

export const hashPassword = async(password)=>{
    const salt = await bcrypt.genSalt(Number(process.env.SALT))

    return await bcrypt.hash(password, salt)
}

export const comparePassword = async(password, hash)=>{
    if(!await bcrypt.compare(password, hash))
        throw{
            msg: "La contraseña es incorrecta.", statusCode: 401
        }
    return
}