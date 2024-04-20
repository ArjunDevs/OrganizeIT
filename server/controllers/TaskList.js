import { TaskList } from "../models/Tasklist.js";
import { Task } from "../models/Task.js";

export const gettasks = async (req, res) => {
    const tasklistId = req.params.tasklistId;
    try {
        const tasklist = await TaskList.findById(tasklistId).populate("tasks");
        if (!tasklist) {
            res.status(404).json({ message: "board not found" });
        }

        const tasks = tasklist.tasks;

        return res.status(200).json({ tasklistId: tasklistId, tasks: tasks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};

export const createtask = async (req, res) => {
    const tasklistId = req.params.tasklistId;
    const data = req.body;

    try {
        const newTask = await Task.create({
            title: data.title,
            description: data.description,
        });

        const UpdatedTaskList = await TaskList.findByIdAndUpdate(
            tasklistId,
            { $push: { tasks: newTask._id } },
            { new: true }
        ).populate("tasks");

        const tasks = UpdatedTaskList.tasks;

        return res.status(200).json({ tasklistId: tasklistId, tasks: tasks });
    } catch (error) {
        console.log(error);
        res.status(500).json("internal server error");
    }
};

export const edittask = async (req, res) => {
    const { tasklistId, taskId } = req.params;
    const data = req.body;

    try {
        const newTask = await Task.findByIdAndUpdate(taskId, data, {
            new: true,
        });

        const Updatedtasklist = await TaskList.findById(tasklistId).populate(
            "tasks"
        );
        const tasks = Updatedtasklist.tasks;

        return res.status(200).json({ tasklistId: tasklistId, tasks: tasks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};

export const deletetask = async (req, res) => {
    const { tasklistId } = req.params;
    const { taskId } = req.body;

    try {
        const tasklist = await TaskList.findById(tasklistId);

        if (!tasklist) {
            return res.status(404).json({ message: "tasklist not found" });
        }

        const index = tasklist.tasks.indexOf(taskId);

        if (index === -1) {
            return res.status(404).json({ message: "task not found" });
        }

        tasklist.tasks.splice(index, 1);

        await tasklist.save();
        await Task.findByIdAndDelete(taskId);

        const updatedTasklist = await TaskList.findById(tasklistId).populate(
            "tasks"
        );

        const tasks = updatedTasklist.tasks;

        return res.status(200).json({ tasklistId, tasks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};

export const dragReorderTask = async (req, res) => {
    const { sourceTaskListId, destinationTaskListId } = req.params;
    const { destinationIndex, sourceIndex, draggedTaskId } = req.body;

    try {
        if (sourceTaskListId !== destinationTaskListId) {
            const sourceTaskList = await TaskList.findById(sourceTaskListId);
            const destinationTaskList = await TaskList.findById(
                destinationTaskListId
            );

            sourceTaskList.tasks.splice(sourceIndex, 1);
            destinationTaskList.tasks.splice(
                destinationIndex,
                0,
                draggedTaskId
            );

            await sourceTaskList.save();
            await destinationTaskList.save();

            const updatedSourceTaskList = await TaskList.findById(
                sourceTaskListId
            ).populate("tasks");
            const updatedDestinationTaskList = await TaskList.findById(
                destinationTaskListId
            ).populate("tasks");

            return res.status(200).json({
                sourceTaskListId: sourceTaskListId,
                destinationTaskListId: destinationTaskListId,
                sourceTasks: updatedSourceTaskList.tasks,
                destinationTasks: updatedDestinationTaskList.tasks,
            });
        } else {
            const sameTaskListId = sourceTaskListId;
            const tasklist = await TaskList.findById(sameTaskListId);
            tasklist.tasks.splice(sourceIndex, 1);
            tasklist.tasks.splice(destinationIndex, 0, draggedTaskId);
            await tasklist.save();

            const updatedtasklist =
                TaskList.findById(sameTaskListId).populate("tasks");
            return res.status(200).json({
                sourceTaskListId: sourceTaskListId,
                destinationTaskListId: destinationTaskListId,
                tasks: updatedtasklist.tasks,
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "internal server error" });
    }
};
