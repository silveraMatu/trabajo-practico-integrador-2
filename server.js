import { app } from "./app.js";
import "dotenv/config"
import { connectDB } from "./src/config/connect.js";

app.listen(process.env.PORT, async()=>{
    try {
        await connectDB()
        console.log("server corriendo");
    } catch (error) {
        console.log("Hubo un problema al conectar con el servidor", error);
    }
})