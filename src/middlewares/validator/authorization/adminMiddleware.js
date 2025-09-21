export const adminMiddleware = (req, res, next)=>{
    const {userData} = req
    
    if(userData.role !== "admin")
        return res.status(403).json({ok: false, msg: "solo un admin puede realizar esta acción"})

    next()
}