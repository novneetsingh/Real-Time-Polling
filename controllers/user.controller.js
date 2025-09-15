import { prisma } from "../config/prisma.js";
import bcrypt from "bcryptjs";

// Create User
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: { name, email, passwordHash },
    });

    res.status(201).json({
      success: user ? true : false,
      message: user ? "User created successfully" : "User not created",
      data: user ? user : null,
    });
  } catch (error) {
    console.log("Error in creating user:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json({
      success: users ? true : false,
      message: users ? "Users fetched successfully" : "Users not fetched",
      data: users ? users : null,
    });
  } catch (error) {
    console.log("Error in fetching users:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
