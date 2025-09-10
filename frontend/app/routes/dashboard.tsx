import {useState} from 'react';


const Dashboard = () => {

	const [users, setUsers] = useState<[]>();
	const [search,setSearch] = useState<string>('');

	const fetchData = () =>{
		fetch("http://localhost:3000/api/get-user/"+search).then(response=>{
		    if (!response.ok) throw new Error("Network response was not ok");
			const data = response.json().then(data=>{
				setUsers(data.data)
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
				<button className='btn btn-primary' onClick={fetchData} >Fetch</button>
				<label className="input validator">
				<svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<g
					strokeLinejoin="round"
					strokeLinecap="round"
					strokeWidth="2.5"
					fill="none"
					stroke="currentColor"
					>
					<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
					<circle cx="12" cy="7" r="4"></circle>
					</g>
				</svg>
				<input
					type="text"
					required
					placeholder="Username"
					pattern="[A-Za-z][A-Za-z0-9\-]*"
					minlength="3"
					maxlength="30"
					value={search}
					onChange={(e)=>{setSearch(e.target.value)}}
					title="Only letters, numbers or dash"
				/>
				</label>
				<p className="validator-hint">
				Must be 3 to 30 characters
				<br />containing only letters, numbers or dash
				</p>
				{users?.map(user=>(
					<h1>{user.name}</h1>
				))}
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
