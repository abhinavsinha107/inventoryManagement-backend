import express from "express";
import {createProduct, getAllProducts, placeOrder} from "../controllers/product.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";
import { isOwner } from "../middlewares/isOwner.middleware";
import { isCustomer } from "../middlewares/isCustomer.middleware";

const router = express.Router();

router.get("/getAllProducts", getAllProducts);
router.post("/createProduct", isAuthenticated, isOwner, createProduct);
router.post("/placeOrder/:productId", isAuthenticated, isCustomer, placeOrder);

export default router;