import express from "express";
import { registerController, loginController, forgotPasswordController, updateProfileController } from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

// router object
const router = express.Router()

//Routing || Method POST
//Register || POST
router.post('/register', registerController)

//LOGIN || POST
router.post('/login', loginController)

// FORGOT PASSWORD || POST
router.post('/forgot-password', forgotPasswordController)
//test router


// protected user routes
router.get("/user-auth", requireSignIn, (req, res) => {
   res.status(200).send({ ok: true });
});

// protected Admin routes
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
   res.status(200).send({ ok: true });
});

// user-profile 
router.put("/profile", requireSignIn, updateProfileController)

export default router
