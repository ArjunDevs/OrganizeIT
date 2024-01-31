import express from "express";

import {
    CreateUser,
    getUserBoards,
    getExistingUser,
} from "../controllers/User.js";

export const UserRouter = express.Router();

UserRouter.post("/signin", getExistingUser);
UserRouter.post("/signup", CreateUser);
UserRouter.get("/:userId/boards", getUserBoards);
