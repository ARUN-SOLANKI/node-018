import { Schema, model } from 'mongoose'
import { SubCategory } from './subCategory.model.js';


const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
        unique: [true, "categroy name should be unique"],  
        trim: true,
    },
    description : {type : String},
}, { timestamps: true })

export const Category = model("Category", CategorySchema)