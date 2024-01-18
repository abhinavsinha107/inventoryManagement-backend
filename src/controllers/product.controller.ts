import express from "express";
import Product from "../models/product.model";

export const createProduct = async (req: express.Request, res: express.Response) => {
    try {
        const {title, quantity, images} = req.body;
        if (!title || !quantity || !images) {
            return res.status(400).json({
                message: "Please provide all details of product..."
            })
        }
        const product = new Product({title, quantity, images, owner: req.userId});
        await product.save();
        return res.status(201).json({
            message: "Product created successfully...",
            product
        })
    } catch (err) {
        return res.status(500).json({
            message: "Unable to create product..."
        })
    }
}

export const getAllProducts = async (req: express.Request, res: express.Response) => {
    try {
        const products = await Product.find({});
        if(!products) {
            return res.status(400).json({
                message: "No Products to show..."
            })
        }
        return res.status(200).json({
            message: "Products fetched successfully...",
            products
        })
    } catch (err) {
        return res.status(500).json({
            message: "Unable to fetch all products..."
        })
    }
}

export const placeOrder = async (req: express.Request, res: express.Response) => {
    try {
        const { quantity } = req.body;
        const product = await Product.findOne({ _id: req.params.productId });
        if (!product) {
            return res.status(400).json({
                message: "No product found with this productId..."
            })
        }
        if (product.quantity < quantity) {
            return res.status(400).json({
                message: "Not enough quantity present..."
            })
        }
        product.quantity -= quantity;
        await product.save();
        return res.status(201).json({
            message: "Order placed successfully..."
        })
    } catch(err) {
        return res.status(500).json({
            message: "Unable to place order"
        })
    }
}