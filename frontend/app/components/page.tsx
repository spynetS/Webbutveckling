import NavBar from "~/components/NavBar"

const Page = (props:{children:any}) => {

	return (
		<main className="w-full h-screen gap-5 px-2 py-5 flex md:flex-row flex-col-reverse ">
			<NavBar/>
			<div className="w-full h-full">
				{props.children}
			</div>

		</main>
	)
}

export default Page;
