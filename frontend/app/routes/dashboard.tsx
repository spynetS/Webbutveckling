import { useEffect, useState, useRef } from 'react';
import type { User } from '~/models/User';
import LineChartComponent from "~/components/LineChartComponent"
import Page from "~/components/page"

// this component takes in a show boolean. when it changes the modal appears
// and then the show boolean sets to false
const Log = (props:{show:boolean,setShow:(bool:boolean)=>void}) => {

	const dialogRef = useRef<HTMLDialogElement>(null)
	const [value, setValue] = useState<string>("")

	const [confirm, setConfirm] = useState<boolean>(false);

	useEffect(()=>{
		if(props.show)
			dialogRef.current?.showModal();
		props.setShow(false);
	},[props.show])

	const logWeight = () => {
		fetch("http://localhost:3000/api/log-weight",{
			credentials: 'include',
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({weight: value})
		}).then(response =>{
			response.json().then(val=>{
				if(val.status==="success"){
					setValue("");
					setConfirm(true);
					// timer that turn of the alrt after 2500ms
					new Promise((resolve) => setTimeout(resolve, 2500)).then(()=>{
						setConfirm(false);
					});
				}
			})
		}).catch(()=>{

		})
	}

	return (
		<div>
			{confirm ? (
				<div onClick={()=>setConfirm(false)} role="alert" className="absolute w-[90%] top-2 z-50 alert alert-success">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span>Your weight was loged!</span>
				</div>
			) : (null)}

			<dialog ref={dialogRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Log weight</h3>
					<p className="py-4">Log your current weight</p>
					<div className="modal-action">
						<form method="dialog">
							<input type="number" name="weight" value={value} onChange={(e)=>{setValue(e.target.value)}} className="input input-bordered" />
							<div>
								<button onClick={logWeight} className="btn btn-primary">Save</button>
								<button onClick={()=>props.setShow(false)} className="btn">Close</button>
							</div>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	)
}

const Dashboard = () => {


	const [_user, setUser] = useState<User>();
	const [search,_setSearch] = useState<string>('');
	const [show, setShow] = useState<boolean>(false);


	useEffect(()=>{{
		fetchData();
	}},[])

	const fetchData = () =>{
		fetch("http://localhost:3000/api/get-user/"+search,{
			credentials: 'include'
		}).then(response=>{
		    if (!response.ok) throw new Error("Network response was not ok");
			response.json().then(data=>{
				setUser(data.data)
			});
		})
	}



	return (
		<Page>


			<Log show={show} setShow={setShow} />

			<div className='gap-5 grid grid-cols-2 grid-rows-2 w-full row-span-2 h-2/5'>
				<div className="stats shadow bg-base-300">
					<div className="stat">
						<div className="stat-title">Total Page Views</div>
						2		<div className="stat-value">89,400</div>
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
				<div className="bg-base-200 flex h-full w-full items-center justify-center rounded-lg">
					<LineChartComponent>
					</LineChartComponent>
				</div>

				<div className="mt-5 flex flex-row items-end gap-2 w-full justify-around">
					<button className='btn btn-lg btn-secondary'>
						Log Excercise
					</button>
					<button onClick={()=>{setShow(true)}} className='btn btn-lg btn-secondary'>
						Log Weight
					</button>
				</div>
			</div>

		</Page>
	)
}

export default Dashboard;
