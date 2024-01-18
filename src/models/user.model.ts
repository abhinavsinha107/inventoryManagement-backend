import mongoose from "mongoose";

// Name, gender, Age, Mobile number, email, password, profile picture and Address, Role

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    mobileNo: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    },
    address: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["owner", "customer"],
        default: "customer",
        required: true,
    }
})

const User = mongoose.model("user", userSchema);

export default User;