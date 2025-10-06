import { Router } from "express";
import { addFriend, getFriends } from "../controllers/friendsController";

const router = Router();

// If you have auth middleware, add it here, e.g.:
// router.use(requireAuth);

router.get("/", getFriends);
router.post("/", addFriend);

export default router;
