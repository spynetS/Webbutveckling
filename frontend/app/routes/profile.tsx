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
    <main className="w-full h-screen flex flex-col items-center pt-40">

    {/* avatars, rounded corners or do we want fully rounded */}

        <div className="flex flex-col items-center gap-8">
            <div className="avatar">
                <div className="w-24 rounded-full">
                <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                </div>
            </div>
        </div>


      {/* Username */}
      
        <p id="test" className="text-5xl font-bold w-64 text-center">
            Username
        </p>

      {/* joined Fitness Duel at ??? */}

      <p id="joindate" className="text-xs font-cursive w-64 text-center mb-2">
        September 18, 2025
      </p>

      {/* joined Fitness Duel at ??? */}

      <button className="btn btn-xs mb-4">edit profile</button>

      {/* LEVEL */}

        <p className="text-3xl font-bold w-64 text-center mb-2">
            Level
        </p>
        <div
            className="radial-progress text-primary mb-4 font-bold"
            style={{ "--value": 70 } as React.CSSProperties}
            >
            23
        </div>


      {/* Bio for your profile */}

        <div className="stats stats-vertical lg:stats-horizontal shadow">
        <div className="stat">
            <div className="stat-title">Friends</div>
            <div className="stat-value">31K</div>
        </div>

        <div className="stat">
            <div className="stat-title">Sessions</div>
            <div className="stat-value">4200</div>
        </div>

        <div class="stat">
            <div className="stat-title">Weight, Age</div>
            <div className="stat-value">70kg, 21 </div>
        </div>
        </div>
    </main>
  );
}
