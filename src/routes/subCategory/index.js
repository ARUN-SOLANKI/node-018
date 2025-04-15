import { Router } from "express"
import { createSubCategory, getAllSubCateries, getCategoryById } from "../../controller/subCategory/subCategory.controller.js";
import { verifyUser } from "../../middleware/auth.middleware.js";


const SubCategoryRouter = Router();


SubCategoryRouter.post('/create', verifyUser, createSubCategory)
SubCategoryRouter.get('/get-all', verifyUser, getAllSubCateries)
SubCategoryRouter.get('/:subCategoryId', verifyUser, getCategoryById)

export default SubCategoryRouter