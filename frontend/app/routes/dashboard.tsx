import React, { useEffect, useState } from 'react';
import type { User } from '~/models/User';
import LineChartComponent from "~/components/LineChartComponent"
import Page from "~/components/page"
import Popup from "~/components/popup"
import { Link } from 'react-router';

type Stats = {
	sessions:number;
}

const Dashboard = () => {


	const [_user, setUser] = useState<User>();
	const [search,_setSearch] = useState<string>('');
	const [show, setShow] = useState<boolean>(false);
	const [alert, setAlert] = useState<boolean>(false);
	const [weight, setWeight] = useState<string>('');


	//stats
	const [stats,setStats] = useState<Stats>()

	useEffect(()=>{{
		fetchData();
	}},[])

	const logWeight = () => {
		fetch("http://localhost:3000/api/log-weight",{
			credentials: 'include',
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({weight: weight})
		}).then(response =>{
			response.json().then(val=>{
				if(val.status==="success"){
					setWeight("");
					setAlert(true)
				}
			})
		}).catch(()=>{

		})
	}


	const fetchData = () =>{
		fetch("http://localhost:3000/api/get-user/"+search,{
			credentials: 'include'
		}).then(response=>{
		    if (!response.ok) throw new Error("Network response was not ok");
			response.json().then(data=>{
				setUser(data.data)
			});
		})

		fetch("http://localhost:3000/api/stats",{
			credentials: 'include'
		}).then(response=>{
		    if (!response.ok) throw new Error("Network response was not ok");
			response.json().then(data=>{
				setStats(data.data)
			});
		})



	}



	return (
		<Page>

			<Popup
				show={show}
				setShow={setShow}
				setAlert={()=>setAlert(false)}
				alert={alert}
				alertText="Your weight was logged"
				heading="Log your weight"
				description="Here you can log your weight"
				onSave={logWeight}
				inputs={(
					<div>
						<input className="input input-bordered" value={weight} onChange={e=>setWeight(e.target.value)} />
					</div>
				)}
			/>

			<div className='gap-5 grid grid-cols-2 grid-rows-2 w-full row-span-2 h-2/5'>
				<div className="stats shadow bg-base-300">
					<div className="stat">
						<div className="stat-title">Total sessions</div>
						<div className="stat-value">{stats?.sessions}</div>
						<div className="stat-desc">21% more than</div>
					</div>
				</div>
				<div className="stats shadow bg-base-200 row-span-2">
					<div className="stat">
						<div className="stat-title">Next workout</div>
						<div className="text-xl stat-value">Upper body</div>
						<div className="stat-desc"></div>
					</div>
				</div>
				<div className="stats shadow bg-base-200">
					<div className="stat">
						<div className="stat-title">Stregnth gained</div>
						<div className="stat-value">30%</div>
						<div className="stat-desc">21% more </div>
					</div>
				</div>
			</div>
			<div className="row-span-2 mt-7">
				<h2 className='text-2xl font-semibold'>Weekly Strength</h2>
			</div>
			<div className='flex flex-col justify-between h-3/7 mt-5'>
				<div className="bg-base-200 flex h-full w-full items-center justify-center rounded-lg">
					<LineChartComponent>
					</LineChartComponent>
				</div>

				<div className="mt-5 flex flex-row items-end gap-2 w-full justify-around">
					<Link to="/workout" className='btn btn-lg btn-secondary'>
						Log Excercise
					</Link>
					<button onClick={()=>{setShow(true)}} className='btn btn-lg btn-secondary'>
						Log Weight
					</button>
				</div>
			</div>

		</Page>
	)
}

export default Dashboard;
