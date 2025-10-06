import React, { useState, type ChangeEvent } from "react";
import Popup from "~/components/popup";


const ExercisePopup = (props:{
	show:boolean,
	setShow: (show:boolean) => void
}) => {

  const [title,setTitle] = useState<string>("");
  const mucles = ['Chest', "Legs", "Arms", "Back"];

  const [type, setType] = useState<string>("Strength");
  const [muscleGroups, setMuscleGroups] = useState<string[]>([]);

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

  const createExercise = () => {
    fetch("http://localhost:3000/api/exercise",{
      credentials:"include",
      method:"post",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        title:title,
        muscleGroups:muscleGroups,
        exerciseType:type
      })
    }).then(response=>{
		props.setShow(false);
	})
  }

  return (
      <Popup show={props.show}
			 setShow={props.setShow}
			 heading="Create Exercise"
			 description=""
			 onSave={createExercise}
			 inputs={
			 (<div className="flex flex-col w-full px-12 items-center gap-5">
				 <input value={title}
						onChange={(e) => { setTitle(e.target.value)}}
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
			 </div>)
			 }/>
  )

}
export default ExercisePopup;
