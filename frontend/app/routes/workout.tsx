import React, { useState, useEffect } from "react";
import Page from "~/components/page";
import type { Workout as WorkoutModel } from "~/models/Workout";
import Exercise from "~/components/exercise"
import type { Set } from "~/models/Set"
import type Exercise from "~/models/Exercise";
import Popup from "~/components/popup";

const Card = (props: { workout: WorkoutModel; setSelectedExercise: (exercise:Exercise) => void }) => {
	return (
		<div className="card bg-base-100 card-sm shadow-sm">
			<div className="card-body">
				<h2 className="card-title">{props.workout.title}</h2>
				<p>{props.workout.weekday}</p>
				<div className="justify-end card-actions">

					{props.workout.exercises.map((exercise,index)=>(
						<button
							key={index}
									className="btn btn-primary"
									onClick={() => props.setSelectedExercise(exercise)}
						>
							Begin {exercise.title}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};



const Workout = () => {
  const [workouts, _setWorkouts] = useState<WorkoutModel[]>([
    {
      title: "Chest",
      weekday: "Monday",
      exercises: [
				{
					title:"benchpress",
					description:""
				},
				{
					title:"benchpress2",
					description:""
				}
			],
    },
  ]);
  const [_workout, _setWorkout] = useState<WorkoutModel | undefined>();
	const [exercise, setExercise] = useState<Exercise>();

	const [show, setShow] = useState<boolean>(false);
	const [exercises, setExercises] = useState<Exercise[]>([]);

	const [selectedExercises, setSelectedExercises] = useState<unknown[]>([]);

	const logExercise = (sets:Set[]) => {
		fetch("http://localhost:3000/api/set/",{
			credentials:"include",
			method:"post",
			body:JSON.stringify(sets)
		}).then(_resposne=>{
		})
	}

	const createWorkout = () => {

	}

	useEffect(()=>{
		fetch("http://localhost:3000/api/exercise",{

		}).then(response => {
			response.json().then(res=>{
				setExercises(res.data)
			})

		})

	},[])


	return (
    <Page>

			<Popup
				show={show}
				setShow={setShow}
				heading="Add new workout"
				description=""
				inputs={(
					<div>
						<input value="" placeholder="Title" className="input input-bordered" />
						<div>
							<p>
								Exercises
							</p>
							<select onChange={(e)=>setSelectedExercises(prev=>[...prev,JSON.parse(e.target.value)])} defaultValue="Pick an exercise" className="select">
								<option >Pick a color</option>
								{exercises.map(val=>(
									<option value={JSON.stringify(val)}>
										{val.title}
									</option>
								))}
							</select>

							{selectedExercises.map(val=>(
								<p>{val.title}</p>
							))}

						</div>
					</div>
				)}
			/>


      {exercise !== undefined ? (
        <Exercise logExercise={logExercise} exercise={exercise} onBack={()=>setExercise(undefined)} ></Exercise>
      ) : (
        <div className="flex flex-col h-full justify-between">
					<div>
						<h1 className="text-3xl font-bold">Workouts</h1>
						{workouts.map((workout, i) => (
							<Card
								key={i}
								workout={workout}
								setSelectedExercise={setExercise}
							/>
						))}
					</div>
          <div className='flex flex-row-reverse'>
						<button onClick={()=>setShow(true)} className='btn btn-primary rounded-full p-5' >
							Add new workout
						</button>
					</div>

        </div>

      )}
    </Page>
  );
};

export default Workout;
