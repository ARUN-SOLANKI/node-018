import express from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import ProductRouter from "./routes/product/index.js";
import UserRouter from "./routes/user/index.js";
import CategoryRouter from "./routes/category/index.js";
import SubCategoryRouter from "./routes/subCategory/index.js";

dotenv.config({
    path: '.env'
})

const app = express()
app.use(cookieParser())

app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"))

app.use("/product", ProductRouter)
app.use("/user", UserRouter)
app.use("/category", CategoryRouter)
app.use("/subCategory", SubCategoryRouter)

export default app