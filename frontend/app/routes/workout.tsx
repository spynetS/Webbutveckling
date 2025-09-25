import React, {useState} from "react";
import Page from "~/components/page"
import Workout from "~/models/Workout"

const Card = (props:{title:string, description:string}) => {
	return(
		<div className="card bg-base-100 card-sm shadow-sm">
			<div className="card-body">
				<h2 className="card-title">{props.title}</h2>
				<p>{props.description}</p>
				<div className="justify-end card-actions">
					<button className="btn btn-primary">Begin</button>
				</div>
			</div>
		</div>
	)
}


const WorkoutPage = () => {

	const [workouts, setWorkouts] = useState<[Workout?]>([]);

	return (
		<Page>

			<h1 className="text-3xl font-bold">Workouts</h1>

			{workouts.map(workout=>(
				<Card title={workout.title} />
			))}

		</Page>
	);
}

export default WorkoutPage;
