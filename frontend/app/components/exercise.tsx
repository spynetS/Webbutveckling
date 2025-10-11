/* Header grej med back button , titel Workuot exercise  X/ '/ 

/* Titel ffor choosen exercise X/ */

/* Picture of the exercise X/ */

/* Brackets with tre titels set reps weight */

/* Button to add a set */

/* Notes */

/* Buttom to ad */





import React, { useMemo, useState, useEffect } from "react";

import type { Set } from "~/models/Set"
import type { Exercise as ExerciseModel } from "~/models/Exercise"
import { apiFetch } from "~/api";
import Popup from "~/components/popup";
import ExerciseGraph from "~/components/exerciseGraph";

const Exercise = (props: { exercise: ExerciseModel, onBack: () => void }) => {
	const [sets, setSets] = useState<Set[]>([]);
	const [notes, setNotes] = useState("");

	const [showGraph, setShowGraph] = useState<boolean>(false);
	
	useEffect(() => {
		console.log(props.exercise)
	}, []);

	const today = useMemo(
		() => new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date()),
		[]
	);


	const logExercise = (sets: Set[]) => {

		sets.forEach(set => {
			apiFetch("/api/set/", {
				method: "POST",
				body: JSON.stringify(set)
			}).then(_resposne => {
			})
		})
	}



	const onEdit = (i: number, field: string, raw: string) => {
		// Allow only digits and at most one decimal point
		let val = raw.replace(/[^\d.]/g, "");           // remove non-digit/non-dot chars
		const parts = val.split(".");
		if (parts.length > 2) {
			val = parts[0] + "." + parts.slice(1).join(""); // keep only first decimal
		}

		setSets((prev) =>
			prev.map((r, idx) => (idx === i ? { ...r, [field]: val } : r))
		);
	};
	const addSet = () => setSets((prev) => [...prev, { template: props.exercise._id, user: props.exercise.creator, duration: 0, reps: 0, weight: 0 }]);

	const saveLog = () => {
		sets.forEach(set => {
			set.reps = parseFloat(set.reps);
			set.weight = parseFloat(set.weight);
			set.duration = parseFloat(set.duration);
			return set;
		})
		logExercise(sets);
	};

	return (
		<div className="w-full h-screen flex flex-col gap-2 px-2 py-5">
			<ExerciseGraph
				show={showGraph}
				setShow={setShowGraph}
				exercise={props.exercise} />

			<p className="text-sm text-base-content/70">{today}</p>
			<div className="flex flex-row justify-between ">
				<a onClick={() => props.onBack()} className="btn btn-ghost text-center text-xl">Back</a>
				<button onClick={()=>setShowGraph(true)} className="btn btn-ghost text-center text-xl">Show graph</button>
			</div>
			<p className="text-2xl font-bold text-center mt-2">{props.exercise?.title}</p>


			<div className="card bg-base-100 w-fit max-h-32 shadow-sm items-center">
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
