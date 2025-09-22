import { Router } from "express";
import { createTag, deleteTag, getAllTags, getTagById, updateTag } from "../controllers/tag.controllers.js";
import { createTagValidation } from "../middlewares/validator/tag/tag.validator.js";
import { applyValidations } from "../middlewares/validator/applyValidations.js";
import { authMiddleware } from "../middlewares/validator/jwt/auth.middleware.js";
import { adminMiddleware } from "../middlewares/validator/authorization/adminMiddleware.js";
import { updateTagValidation } from "../middlewares/validator/tag/updateTag.validator.js";

export const tagRouter = Router()

tagRouter.use(authMiddleware)

tagRouter.post("/tags", adminMiddleware, createTagValidation, applyValidations, createTag)
tagRouter.get("/tags", getAllTags)
tagRouter.get("/tags/:id", getTagById)
tagRouter.put("/tags/:id", adminMiddleware, updateTagValidation, applyValidations, updateTag)
tagRouter.delete("/tags/:id", adminMiddleware, deleteTag)