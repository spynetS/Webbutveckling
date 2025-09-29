import React, { useEffect, useState } from "react";
import Page from "~/components/page";
import type { Workout as WorkoutModel } from "~/models/Workout";
import Exercise from "~/components/exercise"
import type { Set } from "~/models/Set"

const Card = (props: { workout: WorkoutModel; setSelectedExercise: (exercise:any) => void }) => {
	return (
		<div className="card bg-base-100 card-sm shadow-sm">
			<div className="card-body">
				<h2 className="card-title">{props.workout.title}</h2>
				<p>{props.workout.weekday}</p>
				<div className="justify-end card-actions">

					{props.workout.exercises.map(exercise=>(
						<button
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
				}
			],
    },
  ]);
  const [workout, setWorkout] = useState<WorkoutModel | undefined>();
	const [exercise, setExercise] = useState<any>();

	const logExercise = (sets:Set[]) => {
		fetch("http://localhost:3000/api/set/",{
			credentials:"include",
			method:"post",
			body:JSON.stringify(sets)
		}).then(resposne=>{

		})
	}

	return (
    <Page>
      {exercise !== undefined ? (
        <Exercise logExercise={logExercise} exercise={exercise} onBack={()=>setExercise(undefined)} ></Exercise>
      ) : (
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
      )}
    </Page>
  );
};

export default Workout;
