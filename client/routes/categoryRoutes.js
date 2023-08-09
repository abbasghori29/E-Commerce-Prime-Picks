import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController} from "./../controllers/categoryController.js";

const router = express.Router();

//routes
// create category
router.post("/create-category",requireSignIn,isAdmin,createCategoryController
);

// update category
router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController) // id is also passed so that category is changed by id

// get all category
router.get("/get-category",categoryController);

// single category
router.get("/single-category/:slug",singleCategoryController);

// delete category
router.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategoryController) // id is also passed so that category is changed by id


export default router;
