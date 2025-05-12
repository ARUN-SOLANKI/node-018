import { Router } from "express"
import { createSubCategory, getAllSubCateries, getSubCategoryById, getSubcategoriesByCategoryId } from "../../controller/subCategory/subCategory.controller.js";
import { verifyUser } from "../../middleware/auth.middleware.js";


const SubCategoryRouter = Router();


SubCategoryRouter.post('/create', verifyUser, createSubCategory)
SubCategoryRouter.get('/get-all', getAllSubCateries)
SubCategoryRouter.get('/:subCategoryId', verifyUser, getSubCategoryById)
SubCategoryRouter.get('/category/:categoryId', verifyUser, getSubcategoriesByCategoryId)

export default SubCategoryRouter