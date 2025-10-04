import React, { useState, useEffect, type ChangeEvent } from "react";
import { IoMdAdd } from "react-icons/io";
import Page from "~/components/page";
import type { Workout as WorkoutModel } from "~/models/Workout";
import Exercise from "~/components/exercise"
import type { Set } from "~/models/Set"
import type { Exercise as ExerciseModel }  from "~/models/Exercise";
import Popup from "~/components/popup";

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

  const [type, setType] = useState<string>("Strength");
  const [muscleGroups, setMuscleGroups] = useState<string[]>([]);
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
    console.log(muscleGroups)
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
          "type":type,
          muscleGroups:muscleGroups,
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
        <div className="tabs tabs-box w-full">
          <input
            type="radio"
            name="my_tabs_1"
            className="tab w-1/2"
            aria-label="Strength"
            checked={type === "Strength"}
            onChange={handleChange}
          />
          <input
            type="radio"
            name="my_tabs_1"
            className="tab w-1/2"
            aria-label="Cardio"
            checked={type === "Cardio"}
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <p>Mucle Group</p>
          <div className="flex flex-wrap gap-2">
            {mucles.map((mucle,index)=>(
              <input key={index} className="btn" type="checkbox" value={mucle} onChange={toggleMuscleGroup} aria-label={mucle}/>
            ))}
            <p>{muscleGroups.join(',')}</p>
          </div>
        </div>
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

const Workout = () => {
  const [workouts, setWorkouts] = useState<WorkoutModel[]>([]);
  const [exercise, setExercise] = useState<ExerciseModel>();
  const [show, setShow] = useState<boolean>(false);
  const [exercises, setExercises] = useState<ExerciseModel[]>();



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
            <button onClick={()=>setShow(true)} className='btn btn-primary rounded-full p-5' >
              History
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
