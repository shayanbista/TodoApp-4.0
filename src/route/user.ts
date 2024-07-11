import { Router } from "express";
import { getUsers, updateUser, deleteUser } from "../controller/user";
import { authenticate, authorize } from "../middleware/auth";
import { createUser } from "../controller/user";
import {
  createUserBodySchema,
  updateUserBodySchema,
  userIdSchema,
} from "../schema/user";
import { validateReqBody, validateReqParams } from "../middleware/validator";

const userRouter = Router();
userRouter.post(
  "/",
  authenticate,
  authorize("users.post"),
  validateReqBody(createUserBodySchema),
  createUser
);
userRouter.get("/", authenticate, authorize("users.get"), getUsers);

userRouter.put(
  "/:id",
  authenticate,
  authorize("users.put"),
  validateReqParams(userIdSchema),
  validateReqBody(updateUserBodySchema),
  updateUser
);
userRouter.delete(
  "/:id",
  authenticate,
  authorize("users.delete"),
  validateReqParams(userIdSchema),
  deleteUser
);

export default userRouter;
