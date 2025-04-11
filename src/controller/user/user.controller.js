    import { User } from "../../model/user/user.model.js";
    import ApiError from '../../utils/api/ApiError.js'
    import asyncHandler from '../../utils/api/asyncHandler.js'
    import ApiResponse from '../../utils/api/ApiResponse.js'

    export const createUser = asyncHandler(async (req, res) => {
        const { userName, email, password, profilePic } = req.body;

        if (!userName || !email || !password) {
            throw new ApiError(400, "All Fields are Required")
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { userName }]
        })

        if (existingUser) {
            throw new ApiError(400, "User with Email or UserName Already exist")
        }

        const user = await User.create({
            userName, email, password, profilePic: profilePic || null
        })

        const createdUser = await User.findOne({ _id: user._id }).select("-password -refreshToken");

        if (createdUser) {
            return res.status(201).json(new ApiResponse(201, "User successfully created", createdUser));
        }

        throw new ApiError(500, "Failed to create the user");
    })
