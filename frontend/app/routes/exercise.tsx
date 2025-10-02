/* Header grej med back button , titel Workuot exercise  X/ '/ 

/* Titel ffor choosen exercise X/ */

/* Picture of the exercise X/ */

/* Brackets with tre titels set reps weight */

/* Button to add a set */

/* Notes */

/* Buttom to ad */





import React, { useMemo, useState } from "react";
import Page from "~/components/page"

const exercise = () => {
  const [sets, setSets] = useState([{ reps: "", weight: "" }]);
  const [notes, setNotes] = useState("");

  const today = useMemo(
    () => new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date()),
    []
  );


  const onEdit = (i, field, raw) => {
    const val = raw.replace(/[^\d.]/g, "").replace(/^(\d*\.\d*).*$/, "$1");
    setSets((prev) => prev.map((r, idx) => (idx === i ? { ...r, [field]: val } : r)));
  };

  const addSet = () => setSets((prev) => [...prev, { reps: "", weight: "" }]);

  const saveLog = () => {
    const payload = {
      date: new Date().toISOString(),
      exercise: "Bench Press",
      sets: sets.map((s) => ({
        reps: s.reps === "" ? null : Number(s.reps),
        weight: s.weight === "" ? null : Number(s.weight),
      })),
      notes,
    };
    console.log("Log saved:", payload);
    alert("Bra jobbat Alfred✅");
  };

  return (
    <Page>
    <div className="w-full h-screen flex flex-col gap-5 px-2 py-5">
      <div className="navbar bg-base-100 shadow-sm items-center">
        <a className="btn btn-ghost text-center mt-3 text-xl">Arrow</a>
        <a className="text-1xl font-bold text-center mt-3 items-center">
          Compete agaisnt your friends
        </a>
      </div>

      <p className="text-sm text-base-content/70">{today}</p>
      <p className="text-5xl font-bold text-center mt-3">Choosen exercise</p>

      <div className="card bg-base-100 w-96 shadow-sm items-center">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Exercise"
          />
        </figure>
      </div>

      <div className="rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
            
              <th>Set</th>
              <th>Rep</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {sets.map((row, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    className="input input-bordered w-24 text-center"
                    value={row.reps}
                    onChange={(e) => onEdit(i, "reps", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0"
                    className="input input-bordered w-24 text-center"
                    value={row.weight}
                    onChange={(e) => onEdit(i, "weight", e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div>
          <button className="btn" onClick={addSet}>
            +Add Set
          </button>
        </div>

        <div>
          <input
            type="text"
            placeholder="Notes"
            className="input"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div>
          <button className="btn btn-neutral" onClick={saveLog}>
            Log exercise
          </button>
        </div>
      </div>
    </div>
    </Page>
  );
};

export default exercise;
