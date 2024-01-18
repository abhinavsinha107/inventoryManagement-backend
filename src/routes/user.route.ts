import express from "express";
import { getAllUsers, getUser, updateUser, deleteUser } from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";

const router = express.Router();

router.get("/getAllUsers", isAuthenticated, getAllUsers);
router.get("/getUser", isAuthenticated, getUser);
router.patch("/updateUser", isAuthenticated, updateUser);
router.delete("/deleteUser", isAuthenticated, deleteUser);

export default router;