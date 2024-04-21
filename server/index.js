import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { AuthRouter } from "./routes/Auth.js";
import { UserRouter } from "./routes/User.js";
import { BoardRouter } from "./routes/Board.js";
import { TaskListRouter } from "./routes/TaskList.js";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).send("Authentication required");
    }
    jwt.verify(token, process.env.CLIENT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send("Invalid token.");
        }
        const currentTime = new Date();
        if (decoded?.exp * 1000 < currentTime.getTime()) {
            return res.status(401).send("Expired Token");
        }
        next();
    });
};

app.use("/auth", AuthRouter);
app.use("/user", verifyToken, UserRouter);
app.use("/board", verifyToken, BoardRouter);
app.use("/tasklist", verifyToken, TaskListRouter);

const CONNECTION_URL = process.env.MONGODB_CONNECTION_STRING;
const PORT = process.env.port || 5000;

mongoose
    .connect(CONNECTION_URL)
    .then(() =>
        app.listen(PORT, () => console.log(`Server Running on Port : ${PORT}`))
    )
    .catch((error) => console.log(error.message));
