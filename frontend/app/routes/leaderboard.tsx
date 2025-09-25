import { useState } from "react";

export default function Leaderboard() {
  const [filter, setFilter] = useState("Today");
  const filters = ["Today", "This Week", "This Month", "All Time"];

  const players = [
    { name: "Test1", goal: "86", avatar: "https://i.pravatar.cc/50?u=test1" },
    { name: "Test1", goal: "56", avatar: "https://i.pravatar.cc/50?u=test1" },
    { name: "Test1", goal: "23", avatar: "https://i.pravatar.cc/50?u=test1" },
    { name: "Test1", goal: "78", avatar: "https://i.pravatar.cc/50?u=test1" },
    { name: "Test1", goal: "11", avatar: "https://i.pravatar.cc/50?u=test1" },
  ];

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center flex flex-col justify-between min-h-[400px]">

      <div className="space-y-6">

        {/* Title */}
        <h1 className="text-3xl font-bold text-black">Leaderboard</h1>

        {/* Filter Button */}
        <div className="dropdown">
        <div
            tabIndex="0"
            role="button"
            className="btn m-1 w-40 text-lg font-medium"
        >
            {filter}
        </div>
        <ul
            tabIndex="0"
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
            {filters.map((f) => (
            <li key={f}>
                <a
                onClick={() => setFilter(f)}
                className={`flex justify-between items-center ${
                    filter === f ? "font-bold text-blue-600" : ""
                }`}
                >
                {f}
                {filter === f && <span>✔</span>}
                </a>
            </li>
            ))}
        </ul>
        </div>

        {/* Headers */}
        <div className="flex justify-between font-bold text-black text-base border-b-2 pb-3">
          <span className="w-8"></span> {/* Im a lazy dude ok... */}
          <span className="flex-1 text-left font-bold">Player</span>
          <span className="min-w-[100px] text-left font-bold">Goal</span>
        </div>

        {/* Players List */}
        <div className="space-y-4 text-left">
        {players.map((player, i) => {
            
            {/* Banner color */}
            let bg = "";
            if (i === 0) bg = "bg-yellow-200";   // gold-ish
            else if (i === 1) bg = "bg-gray-400"; // silver-ish
            else if (i === 2) bg = "bg-orange-200"; // bronze-ish

            return (
            <div
                key={player.id}
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
                <div className="min-w-[100px] text-left font-semibold text-lg">
                {player.goal}%
                </div>
            </div>
            );
        })}
        </div>
      </div>

      {/* Footer */}
      <p className="text-base text-gray-500 mt-6">
        Keep it up! You’re almost at the top!
      </p>
    </div>
  );
}
