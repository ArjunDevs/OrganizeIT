import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/User.js";
import { Board } from "../models/Board.js";

export const CreateUser = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "user already exists" });

        if (password !== confirmPassword)
            return res.status(400).json({ message: "passwords dont match" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({
            name: `${firstName} ${lastName}`,
            email: email,
            password: hashedPassword,
            boards: [],
        });

        const token = jwt.sign(
            { email: result.email, id: result._id },
            process.env.CLIENT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ result: result, token });
    } catch (error) {
        res.status(500).json({ message: "something went wrong" });
    }
};

export const getExistingUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser)
            return res.status(404).json({ message: "User doesnt exist" });

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "invalid credentials" });

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.CLIENT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "something went wrong" });
    }
};

export const getUserBoards = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId).populate("boards");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const boards = user.boards;
        return res.status(200).json({ boards });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "internal server error" });
    }
};

export const CreateBoard = async (req, res) => {
    const userId = req.params.userId;
    const { title } = req.body;

    try {
        const newBoard = await Board.create({
            title: title,
            taskLists: [],
        });
        const UpdatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { boards: newBoard._id } },
            { new: true }
        ).populate("boards");
        const boards = UpdatedUser.boards;
        return res.status(200).json({ boards });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "internal server error" });
    }
};

export const EditBoard = async (req, res) => {
    const { userId, boardId } = req.params;
    const { title } = req.body;

    try {
        const UpdatedBoard = await Board.findByIdAndUpdate(
            boardId,
            { title: title },
            { new: true }
        );
        const user = await User.findById(userId).populate("boards");
        const boards = user.boards;

        return res.status(200).json({ boards });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "internal server error" });
    }
};

export const DeleteBoard = async (req, res) => {
    const { userId } = req.params;
    const { boardId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const index = user.boards.indexOf(boardId);

        if (index === -1) {
            return res.status(404).json({ error: "Board not found" });
        }

        user.boards.splice(index, 1);

        await user.save();
        await Board.findByIdAndDelete(boardId);

        const UpdatedUser = await User.findById(userId).populate("boards");
        const boards = UpdatedUser.boards;

        return res.status(200).json({ boards });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "internal server error" });
    }
};
