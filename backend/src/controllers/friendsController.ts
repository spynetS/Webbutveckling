import { Request, Response } from "express";
import crypto from "crypto";
import User from "../models/User";

function getUserId(req: Request): string | undefined {
  return req.session.userId;
}

export function makeCode(): string {
  const hex = crypto.randomBytes(4).toString("hex").toUpperCase(); // 8 hex chars
  return `FD-${hex.slice(0, 4)}-${hex.slice(4, 8)}`;
}

/**
 * GET /api/friends
 * Returns the user's friends. Also ensures the caller has a friendCode.
 */
export async function getFriends(req: Request, res: Response) {
  const uid = getUserId(req);
  if (!uid) return res.status(401).json({ message: "Unauthorized" });

  const me = await User.findById(uid);
  if (!me) return res.status(404).json({ message: "User not found" });

  // Ensure caller has a friendCode
  if (!me.friendCode) {
    me.friendCode = makeCode();
    await me.save();
  }

  const populated = await me.populate("friends", "name email friendCode");
  const friends = (populated.friends as any[]).map((f) => ({
    _id: String(f._id),
    name: f.name,
    email: f.email,
    friendCode: f.friendCode,
  }));

  return res.json({
    friendCode: me.friendCode, // handy for the page header
    friends,
  });
}

/**
 * POST /api/friends
 * Body: { code: string }
 * Adds the user with that friendCode to the caller's friends (bidirectional, idempotent).
 */
export async function addFriend(req: Request, res: Response) {
  const uid = getUserId(req);
  if (!uid) return res.status(401).json({ message: "Unauthorized" });

  const { code } = (req.body || {}) as { code?: string };
  if (!code) return res.status(400).json({ message: "Friend code required" });

  const me = await User.findById(uid);
  if (!me) return res.status(404).json({ message: "User not found" });

  // Ensure the caller has a code (first-time)
  if (!me.friendCode) {
    me.friendCode = makeCode();
    await me.save();
  }

  const other = await User.findOne({ friendCode: code.trim() });
  if (!other) return res.status(404).json({ message: "No user with that code" });
  if (String(other._id) === String(me._id))
    return res.status(400).json({ message: "You can’t add yourself" });

  // Add both ways (idempotent)
  const meHas = me.friends?.some((id: any) => String(id) === String(other._id));
  const otherHas = other.friends?.some((id: any) => String(id) === String(me._id));

  if (!meHas) me.friends.push(other._id as any);
  if (!otherHas) other.friends.push(me._id as any);

  await me.save();
  await other.save();

  return res.status(201).json({ message: "Friend added" });
}
