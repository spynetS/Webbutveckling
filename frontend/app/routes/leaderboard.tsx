import React, { useState } from "react";
import Page from "~/components/page"
import Popup from "~/components/popup"
import { apiFetch } from "~/api";


export default function Leaderboard() {

  const [friendPlayers, setFriendPlayers] = React.useState([]);

	const [weightShow,setWeightShow] = useState<boolean>(false);
	const [weightGoal, setWeightGoal] = useState<number>(0);

	const [strengthShow,setStrengthShow] = useState<boolean>(false);
	const [strengthGoal, setStrengthGoal] = useState<number>(0);
	
  React.useEffect(() => {
    fetch("http://localhost:3000/api/leaderboard/friends",{
      credentials:"include"
    })
      .then((res) => res.json())
      .then((data) => setFriendPlayers(data.data || []));
  }, []);

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



return (
  <Page>
		<Popup
			show={weightShow}
			setShow={setWeightShow}
			inputs={
				<div>
					<input value={weightGoal} onChange={e=>setWeightGoal(e.target.value)} className="input input-bordered" placeholder="Weight goal (kg)" />
				</div>
			}
			onSave={()=>setGoal()}
		/>

		<Popup
			show={strengthShow}
			setShow={setStrengthShow}
			inputs={
				<div>
					<input value={strengthGoal} onChange={e=>setStrengthGoal(e.target.value)} className="input input-bordered" placeholder="Weight goal (kg)" />
				</div>
			}
			onSave={()=>addStrengthGoal()}
		/>
		
		
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center flex flex-col justify-between min-h-[400px] h-full">


			
			<div className="fab bottom-24">
				{/* a focusable div with tabIndex is necessary to work on all browsers. role="button" is necessary for accessibility */}
				<div tabIndex={0} role="button" className="btn btn-lg btn-circle btn-info">+</div>

				{/* close button should not be focusable so it can close the FAB when clicked. It's just a visual placeholder */}
				<div className="fab-close">
					Close <span className="btn btn-circle btn-lg btn-error">✕</span>
				</div>

				{/* buttons that show up when FAB is open */}
				<div>Weight goal <button onClick={()=>setWeightShow(true)} className="btn btn-lg btn-circle">W</button></div>
				<div>Strength goal <button onClick={()=>setStrengthShow(true)} className="btn btn-lg btn-circle">S</button></div>
			</div>
			
      <div className="space-y-6">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-black">Friends Leaderboard</h1>


          {/* motivation */}
          <p className="text-base text-gray-500 mt-6">
            Keep it up! You’re almost at the top!
          </p>

        {/* Headers */}
        <div className="flex justify-between font-bold text-black text-base border-b-2 pb-3">
          <span className="w-8"></span>
          <span className="flex-1 text-left">Player</span>
          <span className="min-w-[65px] text-left">Goal</span>
          <span className="min-w-[90px] text-left">Score</span>
        </div>

        {/* Players List */}
        <div className="space-y-4 text-left">

          {friendPlayers.map((player, i) => {
            let bg = "";
            if (i === 0) bg = "bg-yellow-200";   // goldish
            else if (i === 1) bg = "bg-gray-400"; // silverish
            else if (i === 2) bg = "bg-orange-200"; // bronzeish

            return (
              <div
                key={player._id}
                className={`flex justify-between items-center rounded-lg p-2 ${bg}`}
              >
                {/* Rank */}
                <span className="w-8 text-gray-600 font-semibold text-lg flex items-center">
                  {i + 1}
                </span>

                {/* Player info */}
                <div className="flex items-center gap-4 flex-1">
                  <span className="font-semibold text-lg">{player.name}</span>
                </div>

                {/* Goal */}
                <div className="min-w-[75px] text-left font-semibold text-lg">
                  {player.percent}%
                </div>

                {/* Score */}
                <div className="min-w-[70px] text-left font-semibold text-lg">
                  {player.score}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </Page>
  );
}
