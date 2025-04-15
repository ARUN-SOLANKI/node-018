import { Router } from "express"
import { createCategory, getCategories, getCategory } from "../../controller/category/category.controller.js"
import { verifyUser } from "../../middleware/auth.middleware.js"

const CategoryRouter = Router()

CategoryRouter.post("/create" , verifyUser , createCategory)
CategoryRouter.get("/all-categories", verifyUser, getCategories)
CategoryRouter.get("/:categoryId", verifyUser, getCategory)




export default CategoryRouter