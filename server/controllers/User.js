import { User } from "../models/User.js";
import { Board } from "../models/Board.js";

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
