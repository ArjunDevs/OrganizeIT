import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/User.js";

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
