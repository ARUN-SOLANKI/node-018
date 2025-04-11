import ProductModel from "../model/product.model.js";

export const createProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;

        if (!name || !price) {
            return res.status(400).json({
                status: "Failure",
                message: "Name and price are required fields"
            });
        }
        
        const data = await ProductModel.create({
            name,
            price,
            description : description || null,
            category : category || null
        });

        if (data) {
            return res.status(201).json({
                status: "Success",
                message: "Product has been successfully created",
                data
            });
        }

    
    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({
            status: "Failure",
            message: "Internal Server Error. Could not create the product.",
            error: error.message
        });
    }
};



export const getProducts = async (req, res) => {
    try {
        const data = await ProductModel.find();
        return res.status(201).json({
            status: "Success",
            message: "Products has been successfully Fetched",
            data
        });

    } catch (error) {
        console.log(error, "error while fetching Products") 
    }

}

export const getProductById = async (req, res) => {

    try {
        const productId = req.params?.id

        if (!productId) {
            res.status(401).json({
                status: "Failed",
                message: "Product Id Is required",
            })
        }

        const data = await ProductModel.findById(productId)

        res.status(201).json({
            status: "Success",
            message: "Products has been successfully Fetched",
            data
        });
    } catch (error) {

        console.log(error , "error when fetch data")
        
    }
    const productId = req.params.productId

    

}