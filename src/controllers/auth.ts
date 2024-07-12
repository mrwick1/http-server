import { User } from "../models/user";
import { Request, Response } from "../types/types";
import { comparePassword, hashPassword } from "../utils/hash-password";
import { sendResponse } from "../utils/send-response";
import { createToken } from "../utils/token";

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      sendResponse(409, res, { message: "User already exists" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({ username, password: hashedPassword });

    const { password: userPassword, ...userWithoutPassword } = newUser;

    sendResponse(200, res, {
      message: "User created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    sendResponse(500, res, { message: "Internal Server Error" });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    console.log(username, "password");
    const user = await User.findByUsername(username);
    if (!user) {
      sendResponse(404, res, { message: "User not found" });
      return;
    }

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      sendResponse(401, res, { message: "Invalid password" });
      return;
    }

    const { password: userPassword, ...userWithoutPassword } = user;

    const token = createToken({ userId: user.id });
    sendResponse(200, res, {
      message: "User signed in successfully",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.log(error);
    sendResponse(500, res, { message: "Internal Server Error" });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      sendResponse(401, res, { message: "Unauthorized" });
      return;
    }
    const user = await User.findById(req?.userId);
    if (!user) {
      sendResponse(404, res, { message: "User not found" });
      return;
    }

    const { password: userPassword, ...userWithoutPassword } = user;

    sendResponse(200, res, {
      message: "User found",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    sendResponse(500, res, { message: "Internal Server Error" });
  }
};
