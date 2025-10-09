/*using the old code from exercise then setup a new for m where you can choose an apreint exercise picture 

/*you should be given a picrue from the beginning that fits wit hthe words use to describe the exercise you Named 

/*this fucntion should ocur throw modal in daosy ui*/



import { useState } from "react";

// Använder Vites glob-import för att samla alla bildfiler i mappen.
// Returnerar ett objekt där nycklar är filvägar 
const files = import.meta.glob("../exercisephoto/*.{png,jpg,jpeg}", {
  eager: true,
  as: "url",
});

// Gör om objektet path: url  till en array som är enklare att läsa
const IMAGE_OPTIONS = Object.entries(files).map(([path, url]) => {
  // Plocka ur filnamnet
  const name = path.split("/").pop() ?? "image";
  return { url: url as string, name };
});

export default function Exercise2() {
  // State för vald bild-URL eller null om ingen bild är vald
  const [selected, setSelected] = useState<string | null>(null); 

  const openModal = () =>
    (document.getElementById("pick_modal") as HTMLDialogElement)?.showModal();
  const closeModal = () =>
    (document.getElementById("pick_modal") as HTMLDialogElement)?.close();

  // När du har valt en bild så stängs dilagoen och url sparas
  const handleChoose = (url: string) => {
    setSelected(url);
    closeModal();
  };

  return (
    <main className="w-full min-h-screen flex flex-col gap-5 px-2 py-5">
      <div className="navbar bg-base-100 shadow-sm items-center">
        <span className="btn btn-ghost text-center mt-3 text-xl">
          workout exercise
        </span>
      </div>

      {selected ? (
        <div className="max-w-xl w-full mx-auto">
          <img
            src={selected}
            alt="Selected"
            className="rounded-xl w-full object-cover shadow"
          />
        </div>
      ) : (
        <p className="text-center opacity-70">Bosse du har glömt att välja bild</p>
      )}

      <div className="text-center">
        <button className="btn btn-primary" onClick={openModal}>
          Vill du byta bild bosse
        </button>
      </div>

      <dialog id="pick_modal" className="modal">
        <div className="modal-box max-w-3xl">
          <h3 className="font-bold text-lg mb-4">Välj övning Bosse</h3>

          {IMAGE_OPTIONS.length === 0 ? (
            <p className="opacity-70">
              Lägg in bilder bosse <code>app/exphoto</code>.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {IMAGE_OPTIONS.map((img) => (
                <button
                  key={img.url}
                  className="group rounded-xl overflow-hidden border hover:shadow focus:outline-none"
                  onClick={() => handleChoose(img.url)}
                  title={`Use ${img.name}`}
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-32 object-cover group-hover:opacity-90"
                  />
                  <div className="px-2 py-1 text-xs text-center truncate">
                    {img.name}
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Är du klar nu bosse</button>
            </form>
          </div>
        </div>
      </dialog>
    </main>
  );
}








