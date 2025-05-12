import mongoose from "mongoose";
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

export const getAllSubCateries = asyncHandler(async (req, res) => {

    // Filter
    const filteredKeys = ["name", "categoryId"];
    const queryObj = {}
    filteredKeys.forEach(item => {

        if (item === "categoryId" && req.query[item]) {
            const ids = req.query[item].split(",").map(id => id.trim());
            queryObj[item] = { $in: ids };
        } else {
            if (req.query[item]) {
                queryObj[item] = req.query[item]
            }
        }
    })

    let subCategoryQuery = SubCategory.find(queryObj)

    // Sorting
    if (req.query.sortby) {
        const queryStr = req.query.sortby.split(",").join(" ")
        subCategoryQuery = subCategoryQuery.sort(queryStr)
    } else {
        subCategoryQuery = subCategoryQuery.sort("-createdAt")
    }


 // pagination
        let page = req.query.page * 1 || 1
        let limit = req.query.limit * 1 || 10
        const skip = (page -1) * limit
        subCategoryQuery = subCategoryQuery.skip(skip).limit(limit)



    const response = await subCategoryQuery.populate("categoryId", "_id name description")

    if (response) {
        return res.status(200).json(new ApiResponse(200, "SuccessFully Fetched", {
            list: response,
            totalResults : response.length
        }))
    }
    throw new ApiError(500, "Error while fetching Subcategories")
})

export const getSubCategoryById = asyncHandler(async (req, res) => {
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


export const getSubcategoriesByCategoryId = asyncHandler(async (req, res) => {
    const categoryId = req.params.categoryId


    if (!categoryId) {
        throw new ApiError(401, "Category Id Is required")
    }

    const response = await SubCategory.find({
        categoryId: { $in: [new mongoose.Types.ObjectId(categoryId)] }
    });

    if (response) {
        return res.status(200).json(new ApiResponse(200, "SuccessFully Fetched Data", response));
    }


    throw new ApiError(500, `Error while fetching Subcategory whose id is ${subCategoryId}`)
    
})

