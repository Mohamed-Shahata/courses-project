import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { validateorLogin, validateorRegister } from "../middlewares/validators/auth.validator.js";
import expressAsyncHandler from "express-async-handler";



const router = Router();

router.post("/register", validateorRegister, expressAsyncHandler(authController.register));

router.post("/login", validateorLogin, expressAsyncHandler(authController.login));

router.post("/logout", expressAsyncHandler(authController.logout));

router.get("/refreshToken", expressAsyncHandler(authController.refreshAccessToken));


export default router;