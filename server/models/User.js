import mongoose from "mongoose";
import { Board } from "./Board.js";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, reuqired: true },
    boards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Board",
        },
    ],
});

export const User = mongoose.model("User", userSchema);
