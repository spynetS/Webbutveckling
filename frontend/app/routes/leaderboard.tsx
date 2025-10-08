import React from "react";
import Page from "~/components/page"

export default function Leaderboard() {

  const [friendPlayers, setFriendPlayers] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3000/api/leaderboard/friends",{
      credentials:"include"
    })
      .then((res) => res.json())
      .then((data) => setFriendPlayers(data.data || []));
  }, []);

return (
  <Page>
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center flex flex-col justify-between min-h-[400px]">
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
                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-10 h-10 rounded-full"
                  />
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
