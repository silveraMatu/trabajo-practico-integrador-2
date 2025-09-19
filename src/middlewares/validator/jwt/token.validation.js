import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next)=>{
    
    const token = req.cookies["token"]
    if(!token)
        res.status(401).json({ok: false, msg: "Acceso denegado: Provea un token válido."})
    
    const decode = jwt.verify(token, process.env.JWT_SECRET)

    if(!decode)
        res.status(401).json({ok: false, msg: "Acceso denegado: Provea un token válido."})

    req.userData = decode

    next()
}