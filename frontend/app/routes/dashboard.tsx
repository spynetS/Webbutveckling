//import React from 'React';


const Dashboard = () => {
	return (
		<main className='w-full h-screen'>
			<div className='gap-5 grid grid-cols-2 grid-rows-2 h-1/2 w-full'>
				<div className="rounded-lg bg-base-200 ">
					<p  className='text-4xl'>45</p>
				</div>
				<div className="rounded-lg bg-base-300 row-span-2"></div>
				<div className="rounded-lg bg-secondary "></div>

			</div>
		</main>
	)
}

export default Dashboard;
