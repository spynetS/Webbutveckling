/* Header grej med back button , titel Workuot exercise  X/ '/ 

/* Titel ffor choosen exercise X/ */

/* Picture of the exercise X/ */

/* Brackets with tre titels set reps weight */

/* Button to add a set */

/* Notes */

/* Buttom to ad */



import React, {useEffect, useMemo, useState } from "react";
import Page from "~/components/page"
import type {Workout as WorkoutModel} from "~/models/Workout"
import type {Set} from "~/models/Set"

const Exercise = (props: { exercise: ExerciseModel, onBack: () => void, logExercise: (sets:Set[]) => void}) => {
  const [sets, setSets] = useState<Set[]>([]);
  const [notes, setNotes] = useState("");

  useEffect(()=>{
    console.log(props.exercise)
  },[]);

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
    sets.forEach(aSet=>{
      aSet.template = props.exercise.id;
      aSet.user = 0;
    })
    props.logExercise(sets);
  };

  return (
    <div className="w-full h-screen flex flex-col gap-5 px-2 py-5">

      <p className="text-sm text-base-content/70">{today}</p>
      <div>
        <a onClick={()=>props.onBack()} className="btn btn-ghost text-center text-xl">Back</a>
        <p className="text-2xl font-bold text-center mt-2">{props.exercise?.title}</p>
      </div>


      <div className="card bg-base-100 w-fit shadow-sm items-center">
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
  );
};

export default Exercise;
