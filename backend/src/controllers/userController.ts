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