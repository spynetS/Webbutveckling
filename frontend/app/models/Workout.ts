import Exercise from "./Exercise"

export default interface Workout{
	title:string,
	weekday:string,
	exercises: [Exercise]
}
