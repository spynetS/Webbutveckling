import { useState } from "react";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Dashboard to React Router!" },
  ];
}

export default function Signup() {

  {/* UserName input */}
  const [userName, setuserName] = useState<string>("");
  {/* Email input */}
  const [email, setEmail] = useState<string>("");
  {/* Password input */}
  const [password, setPassword] = useState<string>("");
  {/* Response from the server */}
  const [response, setResponse] = useState<any>(null);

  // ALFRED YOU LEGEND!!!!
  const handleSubmit = async (): Promise<void> => {
    
    try {
      const res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email, password }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
      setResponse({ error: "Request failed" });
    }
  };
  return (
    <main className='w-full h-screen flex flex-col items-center pt-40'>
      <div className="mb-8">
          // for the image logo :D
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
            <span>Your Name</span>
            <input value={userName} onChange={(e)=>setuserName(e.target.value)} type="text" placeholder="UserName" className="input input-md" />
          </label>
          {/* Email */}
          <label className="floating-label">
            <span>Your Email</span>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="mail@site.com" className="input input-md" />
          </label>
          {/* Password */}
          <label className="floating-label">
            <span>Your Name</span>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="input input-md" />
          </label>
          {/* Login button, how da fck do I connect it */}
          <button className="btn btn-neutral" onClick={() => { handleSubmit()}}>Sign up!</button>
        </div>
        <p className="text-1xl font-cursive text-center mt-3 text-gray-500">
          Compete against your friends!
        </p>
	</main>
  )
}