import NavBar from "~/components/NavBar"
import React, { type ReactElement } from "react"

const Page = (props:{children:ReactElement}) => {

	return (
		<main className="w-full h-screen gap-5 px-2 py-5 flex md:flex-row flex-col-reverse ">
			<NavBar/>
			<div className="w-full h-full overflow-y-scroll">
				{props.children}
			</div>

		</main>
	)
}

export default Page;
