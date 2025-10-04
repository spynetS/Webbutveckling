import React, { useRef, useState, useEffect, type ReactElement } from "react"

interface Props {
	show:boolean;
	setShow:(bool:boolean)=>void;
	setAlert:(bool:boolean)=>void;
	alert:boolean;
	alertText:string;
	heading:string;
	description:string;
	onSave:()=>void;
	inputs:ReactElement;
}

// this component takes in a show boolean. when it changes the modal appears
// and then the show boolean sets to false
const Popup = (props:Props) => {

	const dialogRef = useRef<HTMLDialogElement>(null)
	const [confirm, setConfirm] = useState<boolean>(false);

	useEffect(()=>{
		if(props.show)
			dialogRef.current?.showModal();
		props.setShow(false);
	},[props.show])


	return (
		<div>
			{confirm ? (
				<div onClick={()=>setConfirm(false)} role="alert" className="absolute w-[90%] top-2 z-50 alert alert-success">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span>{props.alertText}</span>
				</div>
			) : (null)}

			<dialog ref={dialogRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
					<h3 className="font-bold text-lg">{props.heading}</h3>
					<p className="py-4">{props.description}</p>
					<div className="modal-action">
						<form method="dialog">
							{props.inputs}
							<div>
								<button onClick={()=>props.onSave()} className="btn btn-primary">Save</button>
								<button onClick={()=>props.setShow(false)} className="btn">Close</button>
							</div>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	)
}

export default Popup;
