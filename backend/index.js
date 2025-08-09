import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import messageRouter from "./routes/message.route.js";
import loadPayloads from "./utils/loadPayloads.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

connectDB();

loadPayloads()

app.use("/app", messageRouter);
app.listen(PORT, () => {
    console.log("Server is running.....");
})