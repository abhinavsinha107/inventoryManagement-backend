import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    images: {
        type: Array,
        required: true,
    },
    ownerEmail: {
        type: String,
        required: true,
    },
})

const Product = mongoose.model("product", productSchema);

export default Product;