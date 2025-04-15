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
    subCategory: [{
        type: Schema.Types.ObjectId,
        ref: "SubCategory",
        validate: [
            {
                validator: function (arr) {
                    return arr.length > 0;
                },
                message: "At least one subCategory is required",
            },
            {
                validator: async function (arr) {
                    for (const id of arr) {
                        const exists = await SubCategory.findById(id);
                        if (!exists) return false;
                    }
                    return true;
                },
                message: "One or more subCategories do not exist",
            }
        ],
    }]
}, { timestamps: true })

export const Category = model("Category", CategorySchema)