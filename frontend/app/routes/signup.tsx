import React, { useState } from "react";

import { apiFetch } from "~/api";
import { Link } from "react-router";


export default function Signup() {

  {/* UserName input */}
  const [userName, setuserName] = useState<string>("");
  {/* Email input */}
  const [email, setEmail] = useState<string>("");
  {/* Password input */}
  const [password, setPassword] = useState<string>("");
  {/* Response from the server */}
  const [response, setResponse] = useState<unknown>(null);
	const [loading, setLoading] = useState<boolean>(false)

  // ALFRED YOU LEGEND!!!!
  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await apiFetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ userName, email, password }),
      });
			setLoading(false);
      const data = res;
      setResponse(data.data);
    } catch (error:Error) {
      console.error("Error:", error);
      setResponse({ error: "Request failed" });
    }
  };
  return (
    <main className='w-full h-screen flex flex-col items-center pt-40'>

      <div className="avatar flex flex-col items-center mb-2">
        <div className="w-24 rounded-full">
          <img src="app\Images\Logo2.png" alt="Logo" />
        </div>
      </div>
      
        <p id="test" className="text-5xl font-bold w-64 text-center">
            FitnessDual
        </p>
        <p className="text-4xl font-bold text-center mt-3">
          Sign up
        </p>
        <div className="mt-8 w-80 flex flex-col gap-3">
          {/* UserName */}
          <label className="floating-label">
            <span>Username</span>
            <input value={userName} onChange={(e)=>setuserName(e.target.value)} type="text" placeholder="Username" className="input input-md h-12 text-md px-4" />
          </label>
          {/* Email */}
          <label className="floating-label">
            <span>Email</span>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="mail@site.com" className="input input-md h-12 text-md px-4" />
          </label>
          {/* Password */}
          <label className="floating-label">
            <span>Password</span>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="input input-md h-12 text-md px-4" />
          </label>
          {/* Sign up button */}
          <button className="btn btn-neutral h-13 text-xl px-8 py-2" onClick={() => { handleSubmit()}}>
						{loading ? "Signing up…" : "Signup"}
					</button>
        <Link className="btn mt-2" to='/login'>
					Login
        </Link>

          <p>{response}</p>
        </div>
        <p className="text-1xl font-cursive text-center mt-3 text-gray-500">
          Compete against your friends!
        </p>
	</main>
  )
}
