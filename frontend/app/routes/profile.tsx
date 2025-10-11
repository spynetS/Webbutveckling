import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import Page from "~/components/page"
import type {User} from "~/models/User";
import { apiFetch } from "~/api"
import type {Stats} from "~/models/Stats"


export default function Profile() {
  const [_response, setResponse] = useState<unknown>(null);

  const [user, setUser] = useState<User>(null);
  const [weightGoal, setWeightGoal] = useState<string>("");
  const [strengthGoal, setStrengthGoal] = useState<string>("");
	const [stats, setStats] = useState<Stats>();

    useEffect(() => {
        apiFetch("/api/get-user").then(response => {
					setUser(response.data)
				})

			apiFetch("/api/stats").then(response => {
					setStats(response.data)
			})
			
		},[])

  const setGoal = () => {
    apiFetch("/api/set-weight-goal",{
      method:'post',
      body:JSON.stringify({
        weightGoal:parseFloat(weightGoal)
      })
    })
  }

  const addStrengthGoal = () => {
      apiFetch("/api/set-strength-goal", {
          method: 'post',
          body: JSON.stringify({
              strengthGoal: parseFloat(strengthGoal)
          })
      })
    }

    const _handleSubmit = async (): Promise<void> => {
    // Do something here later
    console.log("Submitted!");
    setResponse({ success: true });
  };

  return (
        <Page>
            <div className="w-full h-screen flex flex-col items-center pt-0">

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
                        {user?.name}
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

                    {/* Bio for your profile */}

                    <div className="stats stats-vertical lg:stats-horizontal shadow">
                        <div className="stat">
                            <div className="stat-title">Friends</div>

                            <Link to="/friends" className='btn btn-primary'>
                                Manage friends
                            </Link>

                        </div>

                        <div className="stat">
                            <div className="stat-title">Weight, Age</div>
                          <div className="stat-value">{user?.weightLogs[0].weight}kg, {stats?.strengthProgress.totalStrength}</div>
                            <input className="input input-md input-bordered" placeholder="Weight goal" value={weightGoal} onChange={e => setWeightGoal(e.target.value)} />
                            <button onClick={setGoal} className="btn btn-md btn-primary">
                                Save
                            </button>
                            <input className="input input-md input-bordered" placeholder="strength goal" value={strengthGoal} onChange={e => setStrengthGoal(e.target.value)} />
                            <button onClick={addStrengthGoal} className="btn btn-md btn-primary">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Page>

    );
}
