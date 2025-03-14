import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    productId:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    altNames:{
        type: [String],
        default: []
    },
    price:{
        type: Number,
        required: true
    },
    labeledPrice:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    images:{
        type: [String],
        required: true,
        default: ["https://adaderanaenglish.s3.amazonaws.com/1677496992-cosmetics-6.jpg"]
    },
    stock:{
        type: Number,
        required: true
    },
})

const Product = mongoose.model("products", productSchema);
export default Product;