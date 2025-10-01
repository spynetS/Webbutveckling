//import React from 'React';


import { useState } from "react";

const LOGIN_URL = "http://localhost:3000/api/login";
const SIGNUP_URL = "https://example.com/signup"; // ← placeholder; change later to your real route

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(LOGIN_URL, {
        credentials: 'include',
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const body = await res.json();

      if (!res.ok) {
        setError(body?.data || "Incorrect username or password.");
        return;
      }

      window.location.href = "/dashboard";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="w-full h-screen flex flex-col gap-5 px-2 py-5">
      <div className="avatar flex flex-col items-center">
        <div className="w-24 rounded-full">
          <img src="Logo2.png" />
        </div>
      </div>

      <p className="text-5xl font-bold text-center mt-3">Fitnessduel</p>
      <p className="text-5xl font-bold text-center mt-3">Hello</p>
      <p className="text-5xl font-bold text-center mt-3">Login</p>

      <div className="flex flex-col items-center w-full">
        {error && (
          <div
            role="alert"
            className="w-full max-w-sm mb-3 rounded-md border px-3 py-2 text-sm"
            style={{ background: "#ffdce0", borderColor: "#f5c6cb", color: "#86181d" }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-sm grid gap-3">
          {/* Email */}
          <label className="input validator">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              placeholder="mail@site.com"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>

          {/* Password */}
          <label className="input validator">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="Password"
              autoComplete="current-password"

              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {/* Login Button */}
          <button className="btn btn-neutral" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>

        {/* Sign up Button → placeholder link */}
        <a className="btn mt-2" href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
          Sign up
        </a>
      </div>

      <p className="text-1xl font cursive text-center mt-3 text-gray-500">
        Compete agaisnt your friends
      </p>
    </main>
  );
};

export default Login;
