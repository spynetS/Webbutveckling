import React, { useState, useEffect } from "react";
import Page from "~/components/page";
import type { Workout as WorkoutModel } from "~/models/Workout";
import Exercise from "~/components/exercise"
import type { Exercise as ExerciseModel }  from "~/models/Exercise";
import WorkoutPopup from "~/components/WorkoutPopup"
import ExercisePopup from "~/components/ExercisePopup"
import ExercisePage from "~/components/ExercisePage";

const Card = (props: {
    workout: WorkoutModel;
  setSelectedExercise: (exercise:ExerciseModel) => void,
  deleted: (workout:WorkoutModel) => void
  edit: (workout:WorkoutModel) => void
}) => {

  const deleteWorkout = () =>{
    fetch("http://localhost:3000/api/workout",{
      credentials:'include',
      method:"DELETE",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({
        id:props.workout._id
      })
    }).then(response=>{
      response.json().then(res=>{
        if(res.status=="success"){
          props.deleted(props.workout)
        }
      })
    })
  }

  return (
        <div className="card bg-base-200 card-sm shadow-sm w-full md:w-1/5">
            <div className="card-body">
                <div className="flex flex-row justify-between">
                    <h2 className="card-title">{props.workout.title}</h2>
                    <div>
                        <button onClick={() => props.edit(props.workout)} className="btn btn-xs" >
                            edit
                        </button>
                        <button onClick={deleteWorkout} className="btn btn-error btn-xs" >
                            delete
                        </button>
                    </div>
                </div>

                <p>{props.workout.weekday}</p>
                <div className="card-action flex flex-col text-left">

                    {props.workout.exercises.map((exercise, index) => (
                        <p
                            key={index}
                            className=" text-lg cursor-pointer btn-link "
                            onClick={() => props.setSelectedExercise(exercise)}
                        >
                            {exercise.title}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};


const Workout = () => {
  const [workouts, setWorkouts] = useState<WorkoutModel[]>([]);
  const [exercise, setExercise] = useState<ExerciseModel>();
  const [show, setShow] = useState<boolean>(false);
  const [showExercise, setShowExercise] = useState<boolean>(false);
  const [editWorkout, setEditWorkout] = useState<WorkoutModel>();

  const [tab,setTab] = useState<number>(0);

  const [weekday, setWeekday] = useState<string>("all");

  useEffect(()=>{
    fetch("http://localhost:3000/api/workout").then(response => {
      response.json().then(res=>{
        setWorkouts(res.data)
      })
    })

  },[])


  const workout_page = () =>{

    const weekdays = ['Monday', "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"]

    return(
            <>
                <div className="flex flex-col gap-2">
                    <div role="tablist" className="tabs tabs-box grid grid-cols-2">
                        <a onClick={() => setTab(0)} role="tab" className={`tab ${tab == 0 ? "tab-active" : ""}`}>Workouts</a>
                        <a onClick={() => setTab(1)} role="tab" className={`tab ${tab == 1 ? "tab-active" : ""}`}>Exercises</a>
                    </div>

                    <h1 className="text-3xl font-bold">Workouts</h1>
                    <select onChange={e=>setWeekday(e.target.value)} defaultValue="Pick a color" className="select select-sm">
                        <option value="all" defaultChecked>All</option>
                        {weekdays.map((weekday,index) => (
                          <option key={index} value={weekday} >{weekday}</option>
                        ))}
                    </select>
                    <div className="w-full flex flex-col md:flex-row md:flex-wrap gap-3">
                        {workouts.filter(workout=>weekday == "all" || workout.weekday === weekday).map((workout, i) => (
                            <Card
                                key={i}
                                workout={workout}
                                setSelectedExercise={setExercise}
                                deleted={workout => setWorkouts(prev => prev.filter(w => w._id !== workout._id))}
                                edit={setEditWorkout}
                            />
                        ))}
                    </div>
                </div>

                <div className='flex flex-row justify-between'>
                    <button onClick={() => setShowExercise(true)} className='btn btn-primary rounded-full p-5' >
                        Add new exercise
                    </button>

                    <button onClick={() => setShow(true)} className='btn btn-primary rounded-full p-5' >
                        Add new workout
                    </button>
                </div>
            </>
        )
    }




    return (
      <Page>
        <WorkoutPopup
          setWorkouts={setWorkouts}
          show={show}
          setShow={setShow}
          workout={editWorkout}
          setWorkout={setEditWorkout}
        />

        <ExercisePopup
          show={showExercise}
          setShow={setShowExercise}
        />


        {exercise !== undefined ? (
          <Exercise exercise={exercise} onBack={()=>setExercise(undefined)} />
        ) : (
          <div className="flex flex-col h-full justify-between">
            {tab == 0 ? workout_page() : <ExercisePage doExercise={(exercise) => setExercise(exercise)} setTab={setTab} tab={tab} /> }
          </div>

        )}
      </Page>
    );
  };

export default Workout;
