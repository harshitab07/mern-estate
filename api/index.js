import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

// read env variables
dotenv.config();

// start server
const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

// connect database
const mongo_url = process.env.MONGO_URL;
mongoose.connect(mongo_url).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error in connection with DB', err);
});

// api end points
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});