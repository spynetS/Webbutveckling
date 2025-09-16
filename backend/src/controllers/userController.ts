import User from "../models/User"
import ApiResponse from "../database/response"
import { Router, Request, Response, NextFunction } from "express";

export function userCreate(req: Request, res: Response)
{
    User.create([
    { name: req.body.userName, email: req.body.email, password: req.body.password},
  ]).then(done=>{
    res.json(new ApiResponse({data:"added"}))
  }).catch((error:any) => {
    res.json(new ApiResponse({status:"fail",data:error}))
  });
}



// Added Login

export async function userLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
      return res
        .status(400)
        .json(new ApiResponse({ status: "fail", data: "Email and password are required." }));
    }

    const user = await User.findOne({ email });

    const invalidMsg = "Incorrect username or password.";

    if (!user) {
      return res.status(401).json(new ApiResponse({ status: "fail", data: invalidMsg }));
    }

    // Plain-text comparison 
    const ok = user.password === password;
    if (!ok) {
      return res.status(401).json(new ApiResponse({ status: "fail", data: invalidMsg }));
    }

    // Success
    return res.json(new ApiResponse({ data: { message: "Logged in" } }));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse({ status: "error", data: "Something went wrong." }));
  }
}

