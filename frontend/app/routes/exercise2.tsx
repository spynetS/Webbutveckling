/*using the old code from exercise then setup a new for m where you can choose an apreint exercise picture 

/*you should be given a picrue from the beginning that fits wit hthe words use to describe the exercise you Named 

/*this fucntion should ocur throw modal in daosy ui*/



import { useState } from "react";
import ImagePickerModal from "~/components/exercisechooser"; 

export default function Exercise2() {
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <main className="w-full min-h-screen flex flex-col gap-5 px-2 py-5">
      <div className="navbar bg-base-100 shadow-sm items-center">
        <span className="btn btn-ghost text-center mt-3 text-xl">
          workout exercise
        </span>
      </div>

      {selected ? (
        <div className="max-w-xl w-full mx-auto">
          <img src={selected} alt="Selected" className="rounded-xl w-full object-cover shadow" />
        </div>
      ) : (
        <p className="text-center opacity-70">Bosse du har glömt att välja bild</p>
      )}

      <div className="text-center">
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          Vill du byta bild bosse
        </button>
      </div>

    </main>
  );
}
