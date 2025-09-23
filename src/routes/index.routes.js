import { Router } from "express";
import { authRouter } from "./auth.routes.js";
import { userRouter } from "./user.routes.js";
import { tagRouter } from "./tag.routes.js";
import { articleRouter } from "./article.routes.js";
import { commentRouter } from "./comment.routes.js";
import { articleTagRouter } from "./articleTag.routes.js";

export const routes = Router()

routes.use(authRouter)
routes.use(articleRouter)
routes.use(userRouter)
routes.use(tagRouter)
routes.use(commentRouter)
routes.use(articleTagRouter)