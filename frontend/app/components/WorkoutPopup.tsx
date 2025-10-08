import React, { useState, useEffect, type ChangeEvent, useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import type { Workout as WorkoutModel } from "~/models/Workout";
import type { Exercise as ExerciseModel }  from "~/models/Exercise";
import Popup from "~/components/popup";
import { apiFetch } from "~/api";

const WorkoutPopup = (props: {
	show:boolean,
	setShow: (show:boolean) => void
	setWorkouts: (workouts:WorkoutModel[]) => void,
	exercises:ExerciseModel[],
	workout:WorkoutModel,
	setWorkout:(workout:WorkoutModel) => void
}) =>{

	const weekdays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

	const [selectedExercises, setSelectedExercises] = useState < unknown[] > ([]);
	const [newWorkoutTitle, setNewWorkoutTitle] = useState < string > ();
	const [weekday, setWeekday] = useState<string>("");
	const [exercises, setExercises] = useState<ExerciseModel[]>();

	const toggleWeekday = (e: ChangeEvent<HTMLInputElement>) => {
		setWeekday(e.target.getAttribute("aria-label")?.toString());
	}

	useEffect(()=>{
		setSelectedExercises([])
		setNewWorkoutTitle("")
		setWeekday("")

		if (formRef.current) {
			formRef.current.reset(); // reset form imperatively
		}


		apiFetch("/api/exercise").then(response => {
			setExercises(response.data)
		})

	},[props.show])

	useEffect(()=>{
		if(props.workout){
			setNewWorkoutTitle(props.workout.title);
			setSelectedExercises(props.workout.exercises);
			setWeekday(props.workout.weekday);

			if (formRef.current) {
				formRef.current.reset(); // reset form imperatively
				const mondayRadio = formRef.current.querySelector(
					`input[value="${props.workout.weekday}"]`
				);
				if (mondayRadio) mondayRadio.checked = true;
			}

		}
	},[props.workout])

	const createWorkout = () => {
		// if we are editing we add a id at the end
		apiFetch(`/api/workout${props.workout ? "/"+props.workout._id : ""}`, {
			method: props.workout ? "PUT" : "POST", // if we are edditng we put instead
			body: JSON.stringify(
				{
					title: newWorkoutTitle,
					exercises: selectedExercises.map(exercise => exercise._id),
					weekday:weekday
				}
			)
		}).then(res => {
			if (res.status == "success") {
				if (props.workout) {
					props.setWorkouts(prev => prev.filter(w => w._id !== props.workout._id))
				}
				apiFetch("/api/workout").then(response => {
					props.setWorkouts(response.data);
					props.setShow(false)
				})
			}
		})
	}

	const formRef = useRef<HTMLFormElement>(null);

	return (<Popup show={props.show || props.workout}
		setShow={()=>{props.setShow(false); props.setWorkout(undefined)}}
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
					<form ref={formRef} className="filter">
						<input
							className="btn btn-square"
							type="reset"
							onClick={() => setWeekday("")}
							value="×"
						/>
						{weekdays.map((weekday, index) => (
							<input
								key={index}
								className="btn btn-sm"
								type="radio"
								name="weekday"
								value={weekday}
								aria-label={weekday}
								onChange={toggleWeekday}
							/>
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
							exercises ?. map((val, index) => (<option key={index}
																	  value={
																	  JSON.stringify(val)
																	  }> {
																		  val.title
																	  } </option>))
						}
					</select>
					<button className="btn btn-md btn-ghost w-fit">
						Create Exercise
					</button>
				</div>
			</div>)
		}/>)
}
export default WorkoutPopup;
