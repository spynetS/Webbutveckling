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
		<nav className="text-center lg:relative fixed lg:top-0 lg:left-0 lg:h-screen lg:w-fit lg:border-r-1 lg:border-gray-200 lg:rounded-lg lg:px-3 bottom-0 w-screen h-14 left-0 lg:flex-col flex flex-row lg:justify-start lg:gap-12 justify-around items-center bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)] " >
			<h2 className="text-2xl font-bold lg:flex hidden mt-5" >Fitness <br/> duel</h2>
			<NavLink to="/dashboard" >
				<CgHome size={24} />
			</NavLink>
			<NavLink to="/exercise">
				<CgGym size={24} />
			</NavLink>
			<NavLink to="/leaderboard">
				<MdOutlineLeaderboard size={24} />
			</NavLink>
			<NavLink to="/profile">
				<CgProfile size={24} />
			</NavLink>
		</nav>
	)
}
