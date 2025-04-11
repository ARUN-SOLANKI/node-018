import express from "express";
import dotenv from 'dotenv'
import ProductRouter from "./routes/product/index.js";
import UserRouter from "./routes/user/index.js";

dotenv.config({
    path: '.env'
})

const app = express()

app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"))

app.use("/product", ProductRouter)
app.use("/user", UserRouter)

export default app