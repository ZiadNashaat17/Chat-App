import { Router } from "express";
import * as authController from "../controllers/authController.js";
import * as userController from "../controllers/userController.js";
import authenticate from "../middlewares/authenticate.js";
import { authorizeAdmin } from "../middlewares/authorize.js";

const router = Router();

router.post("/auth/register", authController.register);
router.get("/auth/verify-email/:verifyToken", authController.verifyEmail);
router.post("/auth/login", authController.login);
router.post("/auth/forgot-password", authController.forgotPassword);
router.patch("/auth/reset-password/:resetToken", authController.resetPassword);
router.patch("/auth/reactivate-user", authController.reactivateUser);

router.get("/authenticate-user", authController.authenticateUser);

router.use(authenticate);
router.get("/", userController.getUser);
router.get("/search-user/:input", userController.searchUser);
router.get("/all", authorizeAdmin, userController.getAllUsers);
router.patch("/update-user", userController.updateUser);
router.patch("/auth/change-password", authController.changePassword);
router.patch("/auth/deactivate-user", authController.deactivateUser);
router.get("/logout", userController.logout);

export default router;
