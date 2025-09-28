import React, { useState } from "react";
import Page from "~/components/page";
import type { Workout as WorkoutModel } from "~/models/Workout";
import Exercise from "~/routes/exercise"

const Card = (props: { workout: WorkoutModel; begin: () => void }) => {
	return (
		<div className="card bg-base-100 card-sm shadow-sm">
			<div className="card-body">
				<h2 className="card-title">{props.workout.title}</h2>
				<p>{props.workout.weekday}</p>
				<div className="justify-end card-actions">
					<button
						className="btn btn-primary"
						onClick={() => props.begin()}
					>
						Begin
					</button>
				</div>
			</div>
		</div>
	);
};

const Workout = () => {
  const [workouts, setWorkouts] = useState<WorkoutModel[]>([
    {
      title: "Chest",
      weekday: "Monday",
      exercises: [{
		  title:"benchpress",
		  description:""
	  }],
    },
  ]);

  const [workout, setWorkout] = useState<WorkoutModel | undefined>(undefined);

  return (
    <Page>
      {workout ? (
        <Exercise/>
      ) : (
        <div>
          <h1 className="text-3xl font-bold">Workouts</h1>
          {workouts.map((workout, i) => (
            <Card
              key={i}
              workout={workout}
              begin={() => setWorkout(workout)}
            />
          ))}
        </div>
      )}
    </Page>
  );
};

export default Workout;
