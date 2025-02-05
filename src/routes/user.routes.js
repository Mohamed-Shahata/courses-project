import { Router } from "express";
import { auth, authorizedRole, checkAccountOwner } from "../middlewares/authMiddleware.js";
import * as userController from "../controllers/user.controller.js";
import expressAsyncHandler from "express-async-handler";


const router = Router();

router.get("/", auth, expressAsyncHandler(userController.getAll));

router.get("/:id", auth, expressAsyncHandler(userController.getUser));

router.patch("/:id", auth, checkAccountOwner, expressAsyncHandler(userController.updateUser));

router.delete("/:id", auth, checkAccountOwner, expressAsyncHandler(userController.deleteUser));

export default router;