import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signUp = async (req, res, next) => {
  console.log("signUp API called");
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    console.log("signUp API successful");
    res.status(201).json("User created successfully");
  } catch (err) {
    console.log("signUp API failed");
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  console.log("signIn API called");
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(404, "Invalid credentials"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    console.log("signIn API successful");
    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      ...rest,
      token,
    });
  } catch (err) {
    console.log("signIn API failed");
    next(err);
  }
};
