import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

function connectDB() {
    mongoose.connect(MONGODB_URI)
        .then(() => {
            console.log("Database connected");
        })
        .catch((err) => {
            console.log("Something error in connecting Database", err);
            process.exit(1);
        })
}
export default connectDB;