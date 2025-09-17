import User from "../models/User"
import ApiResponse from "../database/response"
import { Request, Response, } from "express";
import bcrypt from "bcrypt";


export async function userCreate(req: Request, res: Response) {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json(new ApiResponse({
        status: "fail",
        data: "name, email, and password are required"
      }));
    }
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if(!emailRegex.test(req.body.email))
    {
      return res
        .status(400)
        .json(new ApiResponse({status: "fail", data: "Invalid email format"}));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: userName,
      email: email,
      password: hashedPassword
    });

    res.status(201).json(new ApiResponse({ data: "User added successfully" }));
  } catch (error: any) {
    res.status(500).json(new ApiResponse({ status: "error", message: error.message }));
  }
}
