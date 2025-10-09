import User, { Permission } from "../models/User";

export function canDo(user: User): boolean {
  const permission: Permission[] = Permission.find({ user: user });
  console.log(permission);
  return false;
}
