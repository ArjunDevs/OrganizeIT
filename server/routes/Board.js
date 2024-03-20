import express from "express";

import {
    getTaskLists,
    createTaskList,
    editTaskList,
    deleteTaskList,
} from "../controllers/Board.js";

export const BoardRouter = express.Router();

BoardRouter.get("/:boardId/gettasklists", getTaskLists);
BoardRouter.post("/:boardId/createTaskList", createTaskList);
BoardRouter.post("/:boardId/:tasklistId/edittasklist", editTaskList);
BoardRouter.post("/:boardId/deletetasklist", deleteTaskList);
