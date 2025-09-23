import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Conectado exitosamente");
        
    } catch (error) {
        console.log("Hubo un problema al conectar con la bd:", error);
    }
}