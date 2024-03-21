import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { UserRouter } from "./routes/User.js";
import { BoardRouter } from "./routes/Board.js";
import { TaskListRouter } from "./routes/TaskList.js";

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use("/user", UserRouter);
app.use("/board", BoardRouter);
app.use("/tasklist", TaskListRouter);

const CONNECTION_URL = process.env.MONGODB_CONNECTION_STRING;
const PORT = process.env.port || 5000;

mongoose
    .connect(CONNECTION_URL)
    .then(() =>
        app.listen(PORT, () => console.log(`Server Running on Port : ${PORT}`))
    )
    .catch((error) => console.log(error.message));
