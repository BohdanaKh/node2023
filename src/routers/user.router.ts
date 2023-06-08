import { Router } from "express";

import { userController } from "../controllers";
import { userMiddleware } from "../middlewares";

const router = Router();
router.get("/", userController.findAll);
router.post("/", userMiddleware.isCreateValid, userController.create);
router.get(
  "/:id",
  userMiddleware.isUserIdExist,
  userMiddleware.isMongoIdValid,
  userController.findById
);
router.put(
  "/:id",
  userMiddleware.isUserIdExist,
  userMiddleware.isMongoIdValid,
  userMiddleware.isUpdateValid,
  userController.updateById
);
router.delete(
  "/:id",
  userMiddleware.isUserIdExist,
  userMiddleware.isMongoIdValid,
  userController.deleteById
);

export const userRouter = router;
