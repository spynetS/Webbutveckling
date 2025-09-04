import { Request, Response } from "express";


export const getHello = (req: Request, res: Response) => {
  res.json({ success: true, message: "Hello from Express + TypeScript!" });
};
