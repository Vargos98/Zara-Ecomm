import express from "express";
import {
  UserLogin,
  UserRegister,
  addToCart,
  addToFavorites,
  getAllCartItems,
  getAllOrders,
  getUserFavourites,
  placeOrder,
  removeFromCart,
  removeFromFavorites,
} from "../controllers/User.js";


import { verifyToken } from "../middlewares/verifyToken.js";//+


const router = express.Router();

// Helper to wrap async functions for error handling
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post("/signup", asyncHandler(UserRegister));
router.post("/signin", asyncHandler(UserLogin));

// Cart
router.get("/cart", verifyToken, asyncHandler(getAllCartItems));
router.post("/cart", verifyToken, asyncHandler(addToCart));
router.patch("/cart", verifyToken, asyncHandler(removeFromCart));

// Order
router.get("/order", verifyToken, asyncHandler(getAllOrders));
router.post("/order", verifyToken, asyncHandler(placeOrder));

// Favourites
router.get("/favorite", verifyToken, asyncHandler(getUserFavourites));
router.post("/favorite", verifyToken, asyncHandler(addToFavorites));
router.patch("/favorite", verifyToken, asyncHandler(removeFromFavorites));

export default router;
