import { User } from "../model/user.model.js";
import ApiError from "../utils/api/ApiError.js";
import asyncHandler from "../utils/api/asyncHandler.js";
import jwt from "jsonwebtoken";
import { config } from "../utils/configEnv.js";

export const verifyUser = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookie?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, config.accessTokenSecret)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }

        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }

})