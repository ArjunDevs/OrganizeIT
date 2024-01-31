import mongoose from "mongoose";

const boardSchema = mongoose.Schema({
    title: String,
    tasksLists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TaskList",
        },
    ],
});

export const Board = mongoose.model("Board", boardSchema);
