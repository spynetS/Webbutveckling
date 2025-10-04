import React, { useState, useEffect, type ChangeEvent } from "react";
import Page from "~/components/page";
import type { Workout as WorkoutModel } from "~/models/Workout";
import Exercise from "~/components/exercise"
import type { Set } from "~/models/Set"
import type { Exercise as ExerciseModel }  from "~/models/Exercise";

import WorkoutPopup from "~/components/WorkoutPopup"
import ExercisePopup from "~/components/ExercisePopup"

const Card = (props: {
  workout: WorkoutModel;
  setSelectedExercise: (exercise:ExerciseModel) => void,
  deleted: (workout:WorkoutModel) => void
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
    <div className="card bg-base-100 card-sm shadow-sm">
      <div className="card-body">
        <div className="flex flex-row justify-between">
          <h2 className="card-title">{props.workout.title}</h2>
          <button onClick={deleteWorkout} className="btn btn-error btn-xs" >
            delete
          </button>
        </div>

        <p>{props.workout.weekday}</p>
        <div className="justify-end card-action flex flex-col gap-2">

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
  const [workouts, setWorkouts] = useState<WorkoutModel[]>([]);
  const [exercise, setExercise] = useState<ExerciseModel>();
  const [show, setShow] = useState<boolean>(false);
  const [exercises, setExercises] = useState<ExerciseModel[]>();
  const [showExercise, setShowExercise] = useState<boolean>(false);



  const logExercise = (sets:Set[]) => {

    sets.forEach(set=>{
      console.log(JSON.stringify(set))
      fetch("http://localhost:3000/api/set/",{
        credentials:"include",
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(set)
      }).then(_resposne=>{
      })
    })
  }



  useEffect(()=>{
    fetch("http://localhost:3000/api/exercise",{

    }).then(response => {
      response.json().then(res=>{
        setExercises(res.data)
      })

    })
    fetch("http://localhost:3000/api/workout",{

    }).then(response => {
      response.json().then(res=>{
        setWorkouts(res.data)
      })

    })

  },[])


  return (
    <Page>

      <WorkoutPopup
        exercises={exercises}
        setWorkouts={setWorkouts}
        show={show}
        setShow={setShow}
      />

    <ExercisePopup
      show={showExercise}
      setShow={setShowExercise}
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
                deleted={workout=>setWorkouts(prev => prev.filter(w => w._id !== workout._id))}
              />
            ))}
          </div>
          <div className='flex flex-row justify-between'>
            <button onClick={()=>setShowExercise(true)} className='btn btn-primary rounded-full p-5' >
              Add new exercise
            </button>
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
