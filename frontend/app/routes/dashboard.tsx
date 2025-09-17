import { useEffect, useState} from 'react';
import type { User } from '~/models/User';


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
		<main className='w-full h-screen grid grid-col-5 gap-5 px-2 py-5'>
			<div className='gap-5 grid grid-cols-2 grid-rows-2 w-full row-span-2'>
				<div className="rounded-xl bg-base-200 flex items-center justify-center">
					<p  className='text-5xl'>45</p>
				</div>
				<div className="rounded-xl bg-base-300 row-span-2 flex items-center justify-center">
					<p  className='text-5xl'>45</p>
				</div>
				<div className="rounded-xl bg-secondary flex items-center justify-center">
					<p  className='text-5xl'>45</p>
				</div>
			</div>
			<div className="row-span-2">
				<h2 className='text-3xl font-bold'>Weekly Stregth</h2>
			</div>
			<div className="flex flex-row items-end gap-2 w-full justify-around">
				<button className='btn btn-lg btn-secondary'>
					Log Excercise
				</button>
				<button className='btn btn-lg btn-secondary'>
					Log Weight
				</button>
			</div>
		</main>
	)
}

export default Dashboard;
