export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Dashboard to React Router!" },
  ];
}


export default function Signup() {
  return (
    <main className='w-full h-screen grid grid-col-5 gap-5 px-2 py-5'>
        <p id="test" className="">
            Testing
        </p>
	</main>
  )
}