import { Board } from "../models/Board.js";
import { TaskList } from "../models/Tasklist.js";

export const getTaskLists = async (req, res) => {
    const boardId = req.params.boardId;
    try {
        const board = await Board.findById(boardId).populate("taskLists");
        if (!board) {
            res.status(404).json({ message: "board not found" });
        }
        const tasklists = board.taskLists;

        return res.status(200).json({ tasklists });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};

export const createTaskList = async (req, res) => {
    const boardId = req.params.boardId;
    const { title } = req.body;
    try {
        const newTaskList = await TaskList.create({
            title: title,
            tasks: [],
        });

        const UpdatedBoard = await Board.findByIdAndUpdate(
            boardId,
            { $push: { taskLists: newTaskList._id } },
            { new: true }
        ).populate("taskLists");

        const tasklists = UpdatedBoard.taskLists;

        return res.status(200).json({ tasklists });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};

export const editTaskList = async (req, res) => {
    const { boardId, tasklistId } = req.params;
    const reqdata = req.body;

    try {
        const UpdatedTaskList = await TaskList.findByIdAndUpdate(
            tasklistId,
            { title: reqdata.title },
            { new: true }
        );
        const board = await Board.findById(boardId).populate("taskLists");
        const tasklists = board.taskLists;

        return res.status(200).json({ tasklists });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};

export const deleteTaskList = async (req, res) => {
    const { boardId } = req.params;
    const { taskListId } = req.body;
    try {
        const board = await Board.findById(boardId);
        if (!board) {
            return res.status(404).json({ message: "board not found" });
        }

        const index = board.taskLists.indexOf(taskListId);

        if (index === -1) {
            return res.status(404).json({ error: "tasklist not found" });
        }

        board.taskLists.splice(index, 1);

        await board.save();
        await TaskList.findByIdAndDelete(taskListId);

        const UpdatedBoard = await Board.findById(boardId).populate(
            "taskLists"
        );
        const tasklists = UpdatedBoard.taskLists;

        return res.status(200).json({ tasklists });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};
