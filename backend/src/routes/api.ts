import { Router, Request, Response, NextFunction } from "express";
import { getHello } from "../controllers/hello";
import { User } from "../models/User"
const router = Router();

// Middleware to disable caching
router.use((req: Request, res: Response, next: NextFunction) => {
  res.set("Cache-Control", "no-store"); // disable caching for all routes
  next();
});

// Example route
router.get("/hello", getHello);

router.get("/test", (req: Request, res: Response) => {
	res.json({"success":true})
})

router.get("/get-user", (req:Request, res: Response) => {
	const username = (req.query.username as string) || "defaultUser"; // fallback
	let user: User = {
		username: username,
		email: 'alfred@stensatter.se',
		password: "password"
	};
	res.json(user)
})

export default router;
