    import { User } from "../../model/user.model.js";
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


export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password -refreshToken")
    if (users) {
        return res.status(200).json(new ApiResponse(200, "User successfully fetched", users));
    }
    throw new ApiError(500, "Failed To Fetch users List");
})

export const getUserById = asyncHandler(async (req, res) => {
    const userId = req.params.userId
    
    if (!userId) {
        throw new ApiError(401, "userId Is Required !!")
    }

    const response = await User.findById(userId).select("-password -refreshToken");

    if (response) {
        return res.status(200).json(new ApiResponse(200 , "fetched SuccessFully", response))
    }


    throw new ApiError(500 , "Error while Fetch User Details")
})


const genrateTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken =  await user.genrateAccessToken()
        const refreshToken = await user.genrateRefressToken()
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave : false})
        return {
            accessToken,
            refreshToken
        }
        
    } catch (error) {
        throw new ApiError(500, `somthing went wrong ${error}`)
    }
}
    

export const loginUser = asyncHandler(async (req , res) => {
    const { email, userName, password } = req.body;

    if (!(userName || email)) {
        throw new ApiError(400, "Email or UserName reqired")
    }

    const existingUser = await User.findOne({
        $or : [{email}, {userName}]
    })

    if (!existingUser) {
        throw new ApiError(400, "User not Find with Give Creds")
    }

    const isPasswordValid = await existingUser.verifyPassword(password)

    if (!isPasswordValid) {
        throw new ApiError(400, "Password Not match")
    }

    const { accessToken, refreshToken } = await genrateTokens(existingUser._id);

    if (accessToken && refreshToken) {
        const user = await User.findById(existingUser._id).select("-password -refreshToken")
        // return res.status(200).json(new ApiResponse(200, "User successfully created", existingUser));

        const options = {
            httpOnly: true,
            secure : true
        }

        return res
            .status(200)
            .cookie(
                "accessToken" , accessToken, options
            )
            .cookie(
                "refreshToken" , refreshToken, options
        ).json(new ApiResponse(200, "logged In", {
            user,
            accessToken, 
            refreshToken,
        }));

    }

    throw new ApiError(500, "Failed to create the user");

})