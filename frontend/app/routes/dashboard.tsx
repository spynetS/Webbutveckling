import { useEffect, useState} from 'react';
import type { User } from '~/models/User';
import LineChartComponent from "~/components/LineChartComponent"
import NavBar from "~/components/NavBar"

const Dashboard = () => {

	const [user, setUser] = useState<User>();
	const [search,setSearch] = useState<string>('');

	useEffect(()=>{{
		fetchData();
	}},[])

	const fetchData = () =>{
		fetch("http://localhost:3000/api/get-user/"+search,{
			credentials: 'include'
		}).then(response=>{
		    if (!response.ok) throw new Error("Network response was not ok");
			const data = response.json().then(data=>{
				setUser(data.data)
			});			
		})
	}

	return (
		<main className='container mx-auto w-full h-screen gap-5 px-2 py-5'>
			<div className='gap-5 grid grid-cols-2 grid-rows-2 w-full row-span-2 h-2/5'>
				<div className="stats shadow bg-base-300">
					<div className="stat">
						<div className="stat-title">Total Page Views</div>
						<div className="stat-value">89,400</div>
						<div className="stat-desc">21% more than</div>
					</div>
				</div>
				<div className="stats shadow bg-base-200 row-span-2">
					<div className="stat">
						<div className="stat-title">Total Page Views</div>
						<div className="stat-value">89,400</div>
						<div className="stat-desc">21% more </div>
					</div>
				</div>
				<div className="stats shadow bg-base-200">
					<div className="stat">
						<div className="stat-title">Total Page Views</div>
						<div className="stat-value">89,400</div>
						<div className="stat-desc">21% more than</div>
					</div>
				</div>
			</div>
			<div className="row-span-2 mt-7">
				<h2 className='text-2xl font-semibold'>Weekly Stregth</h2>
			</div>
			<div className='flex flex-col justify-between h-3/7 mt-5'>
				<div className="bg-base-200 flex h-full w-full rounded-lg">
					<LineChartComponent>
					</LineChartComponent>
				</div>

				<div className="mt-5 flex flex-row items-end gap-2 w-full justify-around">
					<button className='btn btn-lg btn-secondary'>
						Log Excercise
					</button>
					<button className='btn btn-lg btn-secondary'>
						Log Weight
					</button>
				</div>
			</div>
			<NavBar/>
		</main>
	)
}

export default Dashboard;
