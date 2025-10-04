import { useState } from "react";
import type { Route } from "@react-router/dev/routes";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Dashboard to React Router!" },
  ];
}

export default function Profile() {
  const [response, setResponse] = useState<any>(null);

  // ALFRED YOU LEGEND!!!!
  const handleSubmit = async (): Promise<void> => {
    // Do something here later
    console.log("Submitted!");
    setResponse({ success: true });
  };

  return (
    <main className="w-full h-screen flex flex-col items-center pt-0">

      {/* Banner and Avatar, HOLY FCK STYLING IS ANNOYING */}
      <div className="relative w-full flex justify-center mb-0">
        <div className="w-full max-w-xl h-55 bg-gradient-to-r from-blue-400 to-purple-500 rounded-b-3xl"></div>
        <div className="absolute top-24 flex flex-col items-center w-full">
          <div className="avatar">
            <div className="w-28 rounded-full border-4 border-white shadow-lg">
              <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
            </div>
          </div>
        </div>
      </div>

      {/* Margin to push content below the avatar */}
      <div className="mt-2 flex flex-col items-center w-full">

        <button className="btn btn-xs text-blue-800 font-bold">edit profile</button>

        {/* Username */}
        <p id="test" className="text-5xl font-bold w-64 text-center">
          Username
        </p>

        {/* joined Fitness Duel at ??? */}
        <p id="joindate" className="text-xs font-cursive w-64 text-center mb-2">
          September 18, 2025
        </p>

        {/* LEVEL */}
        <p className="text-3xl font-bold w-64 text-center mb-1">
          Level
        </p>
        <div
          className="radial-progress text-primary font-bold"
          style={{ "--value": 70 } as React.CSSProperties}
        >
          23
        </div>

        {/* Stats */}
        <div className="stats stats-vertical lg:stats-horizontal shadow">
          <div className="stat">
            <div className="stat-title">Friends</div>
            <div className="stat-value">31K</div>
          </div>
          <div className="stat">
            <div className="stat-title">Sessions</div>
            <div className="stat-value">4200</div>
          </div>
          <div className="stat">
            <div className="stat-title">Weight, Age</div>
            <div className="stat-value">70kg, 21 </div>
          </div>
        </div>
      </div>
    </main>
  );
}
