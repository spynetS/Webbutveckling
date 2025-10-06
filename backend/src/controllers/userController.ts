import User, {WeightLog} from "../models/User"
import ApiResponse from "../database/response"
import { Request, Response, } from "express";
import bcrypt from "bcrypt";



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


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json(new ApiResponse({ status: "fail", data: "Invalid credentials" }));
    }

    // save the users id in our session
    req.session.userId = user.id;

    // Success
    return res.json(new ApiResponse({ data: { message: "Logged in" } }));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse({ status: "error", messag: error.message }));
  }
}



export async function userCreate(req: Request, res: Response) {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json(new ApiResponse({
        status: "fail",
        data: "name, email, and password are required"
      }));
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

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
  } catch (error: Error) {
    res.status(500).json(new ApiResponse({ status: "error", message: error.message }));
  }
}



export async function logWeight(req: Request, res: Response){
  if(!req.session.userId || !req.body.weight) {
    return res.status(400).json(new ApiResponse({status:"fail",data:"User not loged in"}))
  }
  const user: User = await User.findById(req.session.userId);

  const log = await WeightLog.create({weight:Number.parseFloat(req.body.weight)});
  user.weightLogs.push(log._id);

  user.save().then(()=>{
    res.json(new ApiResponse({data:user}));
  }).catch((error:Error)=>{
    res.json(new ApiResponse({status:"error",message:error.message}));
  })
}
