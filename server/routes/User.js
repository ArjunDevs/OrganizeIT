import express from "express";

import {
    CreateBoard,
    getUserBoards,
    EditBoard,
    DeleteBoard,
} from "../controllers/User.js";

export const UserRouter = express.Router();

UserRouter.get("/:userId/boards", getUserBoards);
UserRouter.post("/:userId/createboard", CreateBoard);
UserRouter.post("/:userId/:boardId/editboard", EditBoard);
UserRouter.post("/:userId/deleteboard", DeleteBoard);
