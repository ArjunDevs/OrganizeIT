import express from "express";

import {
    CreateUser,
    CreateBoard,
    getUserBoards,
    getExistingUser,
    EditBoard,
    DeleteBoard,
} from "../controllers/User.js";

export const UserRouter = express.Router();

UserRouter.post("/signin", getExistingUser);
UserRouter.post("/signup", CreateUser);
UserRouter.get("/:userId/boards", getUserBoards);
UserRouter.post("/:userId/createboard", CreateBoard);
UserRouter.post("/:userId/:boardId/editboard", EditBoard);
UserRouter.post("/:userId/deleteboard", DeleteBoard);
