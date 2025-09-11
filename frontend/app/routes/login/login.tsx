//import React from 'React';


const Login = () => {
	return (
		<main className='w-full h-screen flex flex-col gap-5 px-2 py-5'>
			<div className="avatar flex flex-col items-center">
  					<div className="w-24 rounded-full">
    					<img src="Logo2.png" />
  				</div>
			</div>
			<p className="text-5xl font-bold text-center mt-3">
				Fitnessduel
			</p>
			<p className="text-5xl font-bold text-center mt-3">
				Hello
			</p>
			<p className="text-5xl font-bold text-center mt-3">
				Login
			</p>

		
			<div className="flex flex-col items-center">
			{/*Email*/}
			<label className="input validator ">
  			<svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    		<g

      		strokeLinejoin="round"
      		strokeLinecap="round"
      		strokeWidth="2.5"
      		fill="none"
      		stroke="currentColor"
    		>
      		<rect width="20" height="16" x="2" y="4" rx="2"></rect>
      		<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    		</g>

		  </svg>
  			<input type="email" placeholder="mail@site.com" required />
			</label>
			<div className="validator-hint hidden ">Enter valid email address</div>
		


		
			{/*Password*/}
			<label className="input validator">
  			<svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    		<g
      		strokeLinejoin="round"
      		strokeLinecap="round"
      		strokeWidth="2.5"
      		fill="none"
      		stroke="currentColor"
    		>
      		<path
        	d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
      		></path>
      		<circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
    		</g>
  			</svg>
  			<input
    		type="password"
    		required
    		placeholder="Password"
    		/*minlength="8"*/
    		pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
    		title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
  			/>
			</label>
			<p className="validator-hint hidden">
  			Must be more than 8 characters, including
  			<br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
			</p>

			</div>
		

		{/*Login Buttom*/}
		<button className="btn btn-neutral">Login</button>

		{/* Sign up Buttom*/}
		<button className="btn">Sign up</button>


		<p className="text-1xl font cursive text-center mt-3 text-gray-500">
  		Compete agaisnt your friends
		</p>

		

		</main>

	)
}

export default Login;
