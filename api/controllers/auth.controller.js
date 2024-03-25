import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res, next) => {
    console.log('signUp API called');
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        console.log('signUp API successful');
        res.status(201).json("User created successfully");
    } catch (err) {
        next(err);
    }
}