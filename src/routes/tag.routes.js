import { Router } from "express";
import { createTag, deleteTag, getAllTags, getTagById, updateTag } from "../controllers/tag.controllers.js";
import { createTagValidation } from "../middlewares/validator/tag/tag.validator.js";
import { applyValidations } from "../middlewares/validator/applyValidations.js";
import { authMiddleware } from "../middlewares/validator/jwt/auth.middleware.js";
import { adminMiddleware } from "../middlewares/validator/authorization/adminMiddleware.js";
import { updateTagValidation } from "../middlewares/validator/tag/updateTag.validator.js";
import { paramValidator } from "../middlewares/param.validator.js";

export const tagRouter = Router()

tagRouter.use(authMiddleware)

tagRouter.post("/tags", adminMiddleware, createTagValidation, applyValidations, createTag)
tagRouter.get("/tags", getAllTags)
tagRouter.get("/tags/:id",paramValidator, applyValidations, getTagById)
tagRouter.put("/tags/:id", paramValidator, applyValidations, adminMiddleware, updateTagValidation, applyValidations, updateTag)
tagRouter.delete("/tags/:id", paramValidator, applyValidations, adminMiddleware, deleteTag)