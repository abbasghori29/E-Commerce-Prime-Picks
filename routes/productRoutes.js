import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getAllOrdersList,
  getOrdersController,
  getProductController,
  getSingleProductController,
  orderStatusController,
  paymentController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  relatedProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();
//create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
); // formidable to upload product photo rest of use is in product controller

//update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
); // formidable to upload product photo rest of use is in product controller

// get all products
router.get("/get-product", getProductController);

// get single product
router.get("/get-product/:slug", getSingleProductController);

// get photo of product
router.get("/product-photo/:pid", productPhotoController); // pid means product id

//delete product
router.delete("/delete-product/:pid", deleteProductController);

// filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

// related-product
router.get("/related-product/:pid/:cid", relatedProductController)

// category wise products
router.get("/product-category/:slug", productCategoryController)

// Payemnt 
router.post("/payment", requireSignIn, paymentController)

//user orders list
router.get("/orders", requireSignIn, getOrdersController)

// admin all orders List
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersList)

// update order status
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
