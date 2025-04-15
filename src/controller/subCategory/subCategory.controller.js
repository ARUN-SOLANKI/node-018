import { SubCategory } from "../../model/subCategory.model.js";
import ApiError from "../../utils/api/ApiError.js";
import ApiResponse from "../../utils/api/ApiResponse.js";
import asyncHandler from "../../utils/api/asyncHandler.js";

export const createSubCategory = asyncHandler(async (req, res) => {
    const { name, description = null, categoryIds } = req.body;

    if (!name) {
        throw new ApiError(401, "Name Is Required")
    }

    if (!categoryIds || !categoryIds.length) {
        throw new ApiError(401, "Please Select Atlease one Category")
    };

    const isExistingSubCategory = await SubCategory.findOne({
        $or: [{ name }]
    })

    if (isExistingSubCategory) {
        throw new ApiError(401, "Subcategory already exist with the name")
    }

    const subCategory = await SubCategory.create({
        name,
        description,
        categoryId: categoryIds
    })


    if (subCategory) {
        return res.status(201).json(new ApiResponse(201, "SuccessFully Created", subCategory))
    }


    throw new ApiError("500", "somthing went wrong")

})

export const getAllSubCateries = asyncHandler(async (req , res) => {
    const response = await SubCategory.find().select("_id name description");
    if (response) {
        return new ApiResponse(200, "SuccessFully Fetched", response)
    }
    throw res.status(200).json(new ApiError(500, "Error while fetching Subcategories"))
})

export const getCategoryById = asyncHandler(async (req) => {
    const subCategoryId = req.params.subCategoryId;
    if (!subCategoryId) {
        throw new ApiError(401, "subCategoryId is Required");
    }

    const response = await SubCategory.findById(subCategoryId).populate("categoryId", "_id name description");

    if (response) {
        return res.status(200).json(new ApiResponse(200, "SuccessFully Fetched Data", response));
    }

    throw new ApiError(500, `Error while fetching Subcategory whose id is ${subCategoryId}`)


})