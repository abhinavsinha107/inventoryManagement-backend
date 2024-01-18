import express from "express";
import User from "../models/user.model";

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user = await User.findOne({ _id: req.userId }).select('-password');
        if (!user) {
            return res.status(400).json({
                message: "Unable to fetch user to add product..."
            })
        }
        if (user.role !== "owner") {
            return res.status(400).json({
                message: "You are not an owner..."
            })
        }
        next();
    } catch(err) {
        return res.status(500).json({
            message: "Unable to fetch role of current user..."
        })
    }
}