import React, { useEffect,useState } from "react"
import { apiFetch } from "~/api";
import LineChartComponent from "~/components/LineChartComponent";
import type { Exercise } from "~/models/Exercise";
import Popup from "~/components/popup"


type Stats = {
	reps:number[];
	weights:number[];
	strengths:number[];
	labels:string[];
}

const ExerciseGraph = (props: {
	show: boolean,
	setShow: (show: boolean) => void,
	exercise: Exercise
}) => {

	const [stats,setStats] = useState<Stats>();
	
	useEffect(() => {
		apiFetch("/api/exercise/stats", {
			method:"post",
			body: JSON.stringify(props.exercise)
		}).then(response=>{
			setStats(response.data)
		})
	}, [props.show])

	return (
		<Popup
			show={props.show}
			setShow={props.setShow}
			inputs={
				<div>
					<LineChartComponent
						datas={[{
							labels: stats?.labels,
							data: stats?.reps,
							label: "Reps",
							title: "Reps over time"
						},
						{
							labels:stats?.labels,
							data: stats?.weights,
							label: "Weight",
							title: "Weight over time"
						},
						{
							labels: stats?.labels,
							data: stats?.strengths,
							label: "Strength",
							title: "Strength over time"
						}]} />

				</div>
			}
		/>
	)
}

export default ExerciseGraph;
