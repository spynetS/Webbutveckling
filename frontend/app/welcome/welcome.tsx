import { useState } from "react"
import type { User } from "../models/User"

export function Welcome() {

  const [user,setUser] = useState<User>(null);
  const [userName, setUsername] = useState<string>("")

  async function fetchUser() {
    const response = await fetch(`http://localhost:3000/api/get-user?username=${userName}`);

    let json: User = await response.json()
    setUser(json)
  }
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-2 min-h-0">

        <input type="text" name="" onChange={(e)=>setUsername(e.target.value)} value={userName} placeholder="Name" className="border-1 p-1 rounded-lg "/>
        <button onClick={fetchUser} className="bg-gray-200 rounded-lg hover:bg-gray-300 p-2 cursor-pointer duration-[150ms]" >
          Fetch
        </button>

        <p>Username: {user?.username.toString()}</p>
        <p>Email: {user?.email.toString()}</p>
        <p>Password: {user?.password.toString()}</p>
      </div>
    </main>
  );
}
