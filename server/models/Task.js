import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: String,
    description: String,
});

export const Task = mongoose.model("Task", taskSchema);
