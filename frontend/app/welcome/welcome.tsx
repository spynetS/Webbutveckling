import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

import { useState } from "react"

interface Data {
  success: boolean
}

export function Welcome() {

  const [data,setData] = useState<Data>({"success":true});

  async function fetchData() {
    const response = await fetch(`http://localhost:3000/api/test`);

    let json: Data = await response.json()
    setData(json)
  }



  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <button onClick={fetchData} >
          Fetch
        </button>
        <p>The request was successful: {data?.success.toString()}</p>
      </div>
    </main>
  );
}
