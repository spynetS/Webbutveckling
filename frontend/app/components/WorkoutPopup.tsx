import React, { useState, useEffect, type ChangeEvent } from "react";
import { IoMdAdd } from "react-icons/io";
import type { Workout as WorkoutModel } from "~/models/Workout";
import type { Exercise as ExerciseModel }  from "~/models/Exercise";
import Popup from "~/components/popup";

const WorkoutPopup = (props: {
	show:boolean,
	setShow: (show:boolean) => void
	setWorkouts: (workouts:WorkoutModel[]) => void,
	exercises:ExerciseModel[]
}) =>{

	const mucles = ['Chest', "Legs", "Arms", "Back"];
	const weekdays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

	const [selectedExercises, setSelectedExercises] = useState < unknown[] > ([]);
	const [newWorkoutTitle, setNewWorkoutTitle] = useState < string > ();
	const [weekday, setWeekday] = useState<string>("");

	const handleChange = (event) => {
		setType(event.target.getAttribute("aria-label")); // get the aria-label
	};

	const toggleMuscleGroup = (e: ChangeEvent<HTMLInputElement>) => {
		const muscle = e.target.getAttribute("aria-label")!
		if (e.target.checked) {
			setMuscleGroups((prev) => [...prev, muscle]);
		} else {
			setMuscleGroups((prev) => prev.filter((m) => m !== muscle));
		}
	};

	const toggleWeekday = (e: ChangeEvent<HTMLInputElement>) => {
		setWeekday(e.target.getAttribute("aria-label")?.toString());
	}

	const createWorkout = () => {
		fetch("http://localhost:3000/api/workout", {
			credentials: 'include',
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(
				{
					title: newWorkoutTitle,
					exercises: selectedExercises.map(exercise => exercise._id),
					weekday:weekday
				}
			)
		}).then(response => {
			response.json().then(res => {
				if (res.status == "success") {
					props.setWorkouts(prev => [
						...prev,
						res.data
					])

					props.setShow(false)
				}
			})
		})
	}

	return (<Popup show={props.show}
				   setShow={props.setShow}
				   heading="Create Workout"
				   description=""
				   onSave={createWorkout}
				   inputs={
				   (<div className="flex flex-col w-full px-12 items-center gap-5">
					   <input value={newWorkoutTitle}
							  onChange={(e) => { setNewWorkoutTitle(e.target.value)}}
							  placeholder="Title"
							  className="input input-bordered"/>
					   <div>
						   <p>Weekday</p>
						   <form className="filter">
							   <input className="btn btn-square" type="reset" onClick={()=>setWeekday("")} value="×"/>
							   {weekdays.map((weekday, index)=>(
								   <input key={index} className="btn btn-sm" type="radio" onChange={toggleWeekday} name={weekday} aria-label={weekday}/>
							   ))}
						   </form>
					   </div>

					   {
						   selectedExercises.map((val, index) => (<div key={index}
																	   className="bg-base-200 justify-between items-center p-3 rounded-lg w-full flex flex-row">
							   <p> {val.title} </p>
							   <div className="flex flex-row gap-4 items-center">
								   <button className="cursor-pointer hover:text-primary text-base w-fit">
									   Edit
								   </button>
								   <IoMdAdd onClick={()=>setSelectedExercises(prev=>prev.filter(w=>w._id !== val._id))} className="cursor-pointer hover:text-primary text-xl w-fit"/>
							   </div>
						   </div>))
					   }
					   <div className="flex flex-row">
						   <select onChange={
						   (e) => setSelectedExercises(prev => [
							   ...prev,
							   JSON.parse(e.target.value)
						   ])
						   }
								   defaultValue="Pick an exercise"
								   className="select">
							   <option>Pick a color</option>
							   {
								   props.exercises ?. map((val, index) => (<option key={index}
																				   value={
																				   JSON.stringify(val)
																				   }> {
																					   val.title
																				   } </option>))
							   } </select>
						   <button className="btn btn-md btn-ghost w-fit">
							   Create Exercise
						   </button>
					   </div>
				   </div>)
				   }/>)
}
export default WorkoutPopup;
