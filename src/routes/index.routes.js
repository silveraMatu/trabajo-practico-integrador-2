import { Router } from "express";
import { authRouter } from "./auth.routes.js";

export const routes = Router()

routes.use(authRouter)