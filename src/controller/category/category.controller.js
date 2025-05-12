import { Category } from "../../model/category.model.js";
import ApiError from "../../utils/api/ApiError.js";
import ApiResponse from "../../utils/api/ApiResponse.js";
import asyncHandler from "../../utils/api/asyncHandler.js";

export const getCategories = asyncHandler(async (_, res) => {
    const data = await Category.find()
    if (data) {
        return res.status(200).json(new ApiResponse(200, "SuccessFully Fetched", data));
    }
    throw new ApiError(500, "Error while Fetching Category")
})


export const getCategory = asyncHandler(async (req, res) => {

    const { categoryId } = req.params
    
    if (!categoryId) {
        throw new ApiError(401, "CategoryId is Required");
    }
    const data = await Category.findById(categoryId)

    if (data) {
        return  res.status(200).json(new ApiResponse(200, "SuccessFully Fetched" , data))
    }
    throw new ApiError(500, "Error while Fetching Category")
})

export const createCategory = asyncHandler(async (req, res) => {
    
    const { name, description } = req.body;

    if (!name) {
        throw new ApiError(401, "Category Name is Required")
    }

    const existingCategory = await Category.findOne({
        $or: [{ name }]
    })

    if (existingCategory) {
        throw new ApiError(401, "Category Name Should be Unique")
    }

    const createdCategory =await Category.create({
        name,
        description: description || null,
    })

    if (createdCategory) {
        return res.status(201).json(new ApiResponse(200, "Category SuccessFully Created", createdCategory))
    }

    throw new ApiError(500, "error while creating category")

    
})