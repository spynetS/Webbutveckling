import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import Page from "~/components/page"
import type {User} from "~/models/User";


export default function Profile() {
  const [_response, setResponse] = useState<unknown>(null);

  const [user, setUser] = useState<User>(null);
  const [weightGoal, setWeightGoal] = useState<string>("");

  useEffect(()=>{
    fetch("http://localhost:3000/api/get-user",{
      credentials:'include'
    }).then(response=>{
      response.json().then(res=>{
        setUser(res.data)
      })
    })
  },[])

  const setGoal = () => {
    fetch("http://localhost:3000/api/set-weight-goal",{
      credentials:'include',
      headers:{"Content-Type":"application/json"},
      method:'post',
      body:JSON.stringify({
        weightGoal:parseFloat(weightGoal)
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
      <div className="w-full overflow-scroll flex flex-col items-center">

        {/* avatars, rounded corners or do we want fully rounded */}

        <div className="flex flex-col items-center gap-8">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
            </div>
          </div>
        </div>


        {/* Username */}

        <p id="test" className="text-3xl font-bold w-64 text-center">
          {user?.name}
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

            <Link to="/friends" className='btn btn-primary'>
              Manage friends
            </Link>

          </div>

          <div className="stat">
            <div className="stat-title">Sessions</div>
            <div className="stat-value">4200</div>
          </div>

          <div className="stat">
            <div className="stat-title">Weight, Age</div>
            <div className="stat-value">70kg, 21 </div>
            <input className="input input-md input-bordered" placeholder="Weight goal" value={weightGoal} onChange={e=>setWeightGoal(e.target.value)}  />
            <button onClick={setGoal} className="btn btn-md btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
}
