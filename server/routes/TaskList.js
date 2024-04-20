import express from "express";

import {
    gettasks,
    createtask,
    edittask,
    deletetask,
    dragReorderTask,
} from "../controllers/TaskList.js";

export const TaskListRouter = express.Router();

TaskListRouter.get("/:tasklistId/gettasks", gettasks);
TaskListRouter.post("/:tasklistId/createtask", createtask);
TaskListRouter.post("/:tasklistId/:taskId/edittask", edittask);
TaskListRouter.post("/:tasklistId/deletetask", deletetask);
TaskListRouter.post(
    "/:sourceTaskListId/:destinationTaskListId/dragreordertask",
    dragReorderTask
);
