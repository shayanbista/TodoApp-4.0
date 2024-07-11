import { Router } from "express";
import { login, refreshToken, signUp } from "../controller/auth";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/signup", signUp);
authRouter.post("/refresh-token", refreshToken);

export default authRouter;
