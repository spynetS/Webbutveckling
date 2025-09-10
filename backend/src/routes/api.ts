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

router.get("/test", (req: Request, res: Response) => {
  const name = req.query.name;
  if (!name)  {
    res.json(new ApiResponse({status:"fail", data:"You must proivide name and email!"}))
  }
  
  User.create([
    { name: name, email: name+"@asd.com" },
  ]).then(done=>{
    res.json(new ApiResponse({data:"added"}))
  }).catch((error:any) => {
    res.json(new ApiResponse({status:"fail",data:error}))
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


router.get("/get-user/:name", (req:Request, res: Response) => {
  const name = req.params.name;
   User.find({name}).then(users =>{
      res.json(new ApiResponse({data: users}));
   }).catch((error:any)=>{
        res.json(new ApiResponse({status:'fail',data: error}));
   })
})

export default router;
