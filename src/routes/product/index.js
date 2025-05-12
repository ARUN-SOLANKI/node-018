import express from "express";
import { createProduct, getProductById, getProducts } from "../../controller/product/product.controller.js";

const ProductRouter = express.Router();

ProductRouter.post('/', createProduct)
ProductRouter.get('/', getProducts)
ProductRouter.get('/:id', getProductById)

export default ProductRouter;
