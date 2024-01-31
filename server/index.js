import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

const CONNECTION_URL = process.env.MONGODB_CONNECTION_STRING;
const PORT = process.env.port || 5000;

mongoose
    .connect(CONNECTION_URL)
    .then(() =>
        app.listen(PORT, () => console.log(`Server Running on Port : ${PORT}`))
    )
    .catch((error) => console.log(error.message));
