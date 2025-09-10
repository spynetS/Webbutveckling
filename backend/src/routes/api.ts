import { Router, Request, Response, NextFunction } from "express";
import { getHello } from "../controllers/hello";
import User from "../models/User"
import ApiResponse from "../database/response"
import process = require("process");

const router = Router();

// Middleware to disable caching
router.use((req: Request, res: Response, next: NextFunction) => {
  res.set("Cache-Control", "no-store"); // disable caching for all routes
  next();
});

// Example route
router.get("/hello", getHello);

router.get("/test", (req: Request, res: Response) => {
	User.create([
    { name: "leo", email: "leo@example.com" },
  ]).then(done=>{
    res.json(new ApiResponse({data:"added"}))
  });
})

router.get("/get-users", (req:Request, res: Response) => {
	try {
   User.find().then(users =>{
      res.json(new ApiResponse({data: users}));
   })
  } catch (err: any) {
    res.status(500).json(new ApiResponse({status:"error",message:err}));
  }
})

export default router;
