import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors"
import { routes } from "./src/routes/index.routes.js";

export const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api", routes)