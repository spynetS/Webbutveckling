import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import Popup from "~/components/popup";
import type { Set } from "~/models/Set"
import type { Exercise as ExerciseModel } from "~/models/Exercise";


const ExercisePage = (props: {
	setTab: (tabIndex: number) => void,
	tab:number,
	doExercise:(exercise:ExerciseModel) => void
}) => {
	const [showLogExercise, setShowLogExercise] = useState<boolean>(false);
	const [sets, setSets] = useState<Set[]>([]);

	const [selectedExercise, setSelectedExercise] = useState<unknown[]>([]);
	const [exercises, setExercises] = useState<ExerciseModel[]>();


	useEffect(() => {
		fetchData()

	}, [])

	const fetchData = () => {
		fetch("http://localhost:3000/api/set").then(response => {
			response.json().then(res => {
				setSets(res.data)
			})
		 })

		fetch("http://localhost:3000/api/exercise").then(response => {
			response.json().then(res=>{
				setExercises(res.data)
			})
		})
	}

	const remove = (aSet: Set) => {
		fetch("http://localhost:3000/api/set",{
			method:"delete",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({
				id:aSet._id
			})
		}).then(_response=>{
			fetchData();

		})
	}

	return (
		<>

			<div className="flex flex-col gap-2">
				<div role="tablist" className="tabs tabs-box grid grid-cols-2">
					<a onClick={() => props.setTab(0)} role="tab" className={`tab ${props.tab == 0 ? "tab-active" : ""}`}>Workouts</a>
					<a onClick={() => props.setTab(1)} role="tab" className={`tab ${props.tab == 1 ? "tab-active" : ""}`}>Exercises</a>
				</div>
				<h1 className="text-3xl font-bold">Exercise</h1>
				{sets.map((aset, index) => (
					<div key={index} className="bg-base-200 p-3 rounded-lg flex flex-row justify-between">
						<p className="font-semibold">{aset.template.title}</p>
						<div className="flex flex-row gap-2 items-center">
							<p>{aset.reps} x {aset.weight}kgs</p>
							<MdDelete onClick={()=>remove(aset)} />
						</div>


					</div>
				))}
			</div>
			<Popup
				heading="Which exercise"
				show={showLogExercise}
				setShow={setShowLogExercise}
				inputs={(
					<div>
						<select onChange={(e) => setSelectedExercise(JSON.parse(e.target.value))}
							defaultValue="Pick an exercise"
							className="select">
							<option>Pick a color</option>
							{
								exercises?.map((val, index) => (<option key={index}
									value={
										JSON.stringify(val)
									}> {
										val.title
									} </option>))
							}
						</select>
						<button onClick={()=>props.doExercise(selectedExercise)} className='btn btn-primary' >
							Open exercise
						</button>
					</div>
				)}
			/>

			<div className='flex flex-row justify-between'>
				<button onClick={() => setShowLogExercise(true)} className='btn btn-primary rounded-full p-5' >
					Log exercise
				</button>
			</div>
		</>
	)
}

export default ExercisePage;
