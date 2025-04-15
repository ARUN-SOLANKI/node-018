import { Mongoose, Schema, model } from "mongoose"
import { Category } from "./category.model.js";


const subCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: [true, "subCategory name should be unique"],  
    },
    description: { type: String },
    categoryId: [
        {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "At least one category is required"],
            validate: {
                validator: async function (value) {
                    const exists = await Category.findById(value);
                    return !!exists;
                },
                message: "Category does not exist",
            }
        }
    ]
}, {
    timestamps : true
})


export const SubCategory = model("SubCategory", subCategorySchema )