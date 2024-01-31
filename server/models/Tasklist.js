import mongoose from "mongoose";

const taskListSchema = mongoose.Schema({
    title: String,
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
        },
    ],
});

export const TaskList = mongoose.model("TaskList", taskListSchema);
