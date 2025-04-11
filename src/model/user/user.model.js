import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { config } from "../../utils/configEnv.js";

const userSchema = new Schema({
    email: {
        type : String,
        required: [true, "email is required"],
        unique: [true, "email should be unique"],  
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    userName: {
        type: String,
        required: [true, "userName is Required"],
        unique: [true, "userName should be unique"], 
        trim: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    profilePic: {
        type: String, 
    },
    isActive: {
        type: Boolean,
        default : true
    },
    refreshToken: {
        type: String,
    }

}, {
    timestamps : true
})


userSchema.pre("save", async function (next) {
    if (!this.isModified) next()
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.verifyPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.methods.genrateAccessToken = async function () {
    const token = await jwt.sign({
        id: this._id,
        email: this.email,
        userName : this.userName
    }, config.accessTokenSecret, {
        expiresIn : config.accessTokenExpiry
    })
    
    return token
}
userSchema.methods.genrateRefressToken = async function () {
    const token = await jwt.sign({
        id: this._id,
    }, config.refreshTokenSecret, { expiresIn: config.refreshTokenExpiry })
    
    return token
}

export const User = model("User" , userSchema)