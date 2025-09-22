import { CgHome, CgGym, CgProfile } from "react-icons/cg";
import { MdOutlineLeaderboard } from "react-icons/md";
import { Link } from "react-router";
import { useLocation } from 'react-router'

const NavLink = (props: {to:string,children:any }) =>{
	let location = useLocation()

	return (
		<Link to={props.to}  className={props.to ==  location.pathname ? ` bg-primary rounded-full p-3` : 'p-3'}>
			{props.children}
		</Link>
	)
}


export default function NavBar() {
	return(
		<nav className="fixed bottom-0 w-screen h-14 left-0 flex flex-row justify-around items-center bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)] " >
			<NavLink to="/dashboard" >
				<CgHome size={24} />
			</NavLink>
			<NavLink to="/">
				<CgGym size={24} />
			</NavLink>
			<NavLink to="/">
				<MdOutlineLeaderboard size={24} />
			</NavLink>
			<NavLink to="/">
				<CgProfile size={24} />
			</NavLink>
		</nav>
	)
}
