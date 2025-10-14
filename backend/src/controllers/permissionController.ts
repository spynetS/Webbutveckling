import User, { Permission } from "../models/User";

export async function canDo(user: User, modelType: string, action:string): boolean {
  const permissions: Permission[] = await Permission.find({ user: user, modelType: modelType });

	if(!permissions) return false;
	
	permissions.forEach(perm=>{
		if(perm.action === action)
			return true;
	})
	
  return false;
}


export async function setNewPermission(user: User,modelType:string, action: string, ) {

		const permission = await Permission.create({
    action: action,
    user: user._id,
    modelType: modelType,
  });
	
}
