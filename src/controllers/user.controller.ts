import express from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user.model";

// Get All Users
export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await User.find({}).select('-password');
        return res.status(200).json({
            message: "Fetched all users successfully...", users
        })
    } catch (err) {
        return res.status(500).json({
            message: "Unable to get all users..."
        })
    }
}


// Get LoggedIn users's details
export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const user = await User.findOne({ _id: req.userId }).select('-password');
        if (!user) {
            return res.status(400).json({
                message: "Unable to fetch user"
            })
        }
        return res.status(200).json({
            user
        })
    } catch (err) {
        return res.status(500).json({
            message: "unable to get user details..."
        })
    }
}


// Update User
// Name, gender, Age, Mobile number, email, password, profile picture and Address
export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        await User.findByIdAndUpdate(req.userId, {
            $set: {
                name: req.body.name,
                gender: req.body.gender,
                age: req.body.age,
                mobileNo: req.body.mobileNo,
                email: req.body.email,
                password: req.body.password,
                profilePic: req.body.profilePic,
                address: req.body.address,
            }
        })
        return res.status(201).json({
            message: "User updated successfully..."
        })
    } catch (err) {
        return res.status(500).json({
            message: "Unable to update user..."
        })
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        await User.findByIdAndDelete(req.userId);
        res.clearCookie("authToken");
        res.clearCookie("refreshToken");
        return res.status(201).json({
            message: "User deleted successfully..."
        })
    } catch (err) {
        return res.status(500).json({
            message: "Unable to delete user..."
        })
    }
}