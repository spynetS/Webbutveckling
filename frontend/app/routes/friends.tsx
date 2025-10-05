
/* Back arrow and Fitnessduel title*X/

/* Friends title *X/

/* pharagraph your friend code text and your code *Xy/

/* pharagraph list of all your friends and how long ago they trained*/


/* A button to add friends with title "Add Friend"*Xy/


/*A pharapragh where you can paste your friends code then add them as friends Xy*/

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

type Friend = {
  _id: string;
  name: string;
  lastTrainedAt: string | null; // ISO string from API
};

const API = "/api"; // adjust if your backend is on a different base path

function timeAgo(iso: string | null): string {
  if (!iso) return "aldrig"; // never
  const diffMs = Date.now() - new Date(iso).getTime();
  const sec = Math.max(1, Math.floor(diffMs / 1000));
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);

  if (sec < 60) return `${sec} sekunder sen`;
  if (min < 60) return `${min} minuter sen`;
  if (hr < 24) return `${hr} timmar sen`;
  return `${day} dagar sen`;
}

export default function Friends() {
  const navigate = useNavigate();

  const [friendCode, setFriendCode] = useState<string>("••••••••");
  const [friends, setFriends] = useState<Friend[]>([]);
  const [addCode, setAddCode] = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const [codeRes, listRes] = await Promise.all([
        fetch(`${API}/friend-code`, { credentials: "include" }),
        fetch(`${API}/friends`, { credentials: "include" }),
      ]);
      if (codeRes.ok) {
        const { code } = await codeRes.json();
        setFriendCode(code);
      }
      if (listRes.ok) {
        const { friends } = await listRes.json();
        setFriends(friends);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(friendCode);
  }, [friendCode]);

  const handleAdd = useCallback(async () => {
    if (!addCode.trim()) return;
    const res = await fetch(`${API}/friends`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: addCode.trim() }),
    });
    if (res.ok) {
      setAddCode("");
      await load();
    } else {
      const { message } = await res.json().catch(() => ({ message: "Error" }));
      alert(message || "Could not add friend");
    }
  }, [addCode, load]);

  const header = useMemo(
    () => (
      <div className="navbar bg-base-100 shadow-sm items-center">
        <button
          className="btn btn-ghost text-center mt-3 text-xl"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          Arrow
        </button>
        <div className="text-4xl font-bold text-center mt-3 items-center">
          FitnessDuel
        </div>
      </div>
    ),
    [navigate]
  );

  return (
    <main className="w-full min-h-screen flex flex-col gap-5 px-2 py-5">
      {header}

      {/* Friends title */}
      <p className="text-5xl font-bold text-center mt-3">Friends</p>

      {/* Your friend code */}
      <p className="text-3xl font-bold text-center mt-3">Your Friend Code</p>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex items-center justify-center w-full gap-2 mt-3">
          <p className="text-lg font-bold">{friendCode}</p>
          <button className="btn btn-ghost p-2" onClick={handleCopy} title="Copy code">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 2a2 2 0 00-2 2v10h2V4h8V2H6z" />
              <path d="M8 6a2 2 0 012-2h6a2 2 0 012 2v10a2 2 0 01-2 2H10a2 2 0 01-2-2V6z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Friends list with “how long ago” */}
      <div className="divide-y divide-gray-200 text-sm">
        {loading && friends.length === 0 ? (
          <p className="py-2 text-center text-gray-500">Loading…</p>
        ) : friends.length === 0 ? (
          <p className="py-2 text-center text-gray-500">No friends yet.</p>
        ) : (
          friends.map((f) => (
            <p key={f._id} className="flex justify-between py-2 text-gray-800 font-medium">
              <span>{f.name}</span>
              <span className="text-gray-500">{timeAgo(f.lastTrainedAt)}</span>
            </p>
          ))
        )}
      </div>

      {/* Add friend */}
      <div className="flex flex-col items-center gap-4">
        <button className="text-3xl btn btn-neutral" onClick={handleAdd}>
          Add Friend
        </button>
        <input
          type="text"
          placeholder="Your Friends Code"
          className="input input-bordered w-full max-w-xs"
          value={addCode}
          onChange={(e) => setAddCode(e.target.value)}
        />
      </div>
    </main>
  );
}
