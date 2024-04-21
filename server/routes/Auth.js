import express from "express";

import { CreateUser, getExistingUser } from "../controllers/Auth.js";

export const AuthRouter = express.Router();

AuthRouter.post("/signin", getExistingUser);
AuthRouter.post("/signup", CreateUser);
