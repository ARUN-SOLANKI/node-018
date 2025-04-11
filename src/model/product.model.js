import { Schema, model } from "mongoose";

export const PRODUCT_SCHEMA_NAME = "Product"

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'], 
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    description: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: false,
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // }
},{timestamps : true});

const ProductModel = model(PRODUCT_SCHEMA_NAME, productSchema);

export default ProductModel;
