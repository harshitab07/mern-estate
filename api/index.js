import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// read env variables
dotenv.config();

// start server
const app = express();

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