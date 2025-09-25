import { type RouteConfig, index, route } from "@react-router/dev/routes";

<<<<<<< HEAD
export default [index("routes/home.tsx"),
                route("signup", "routes/signup.tsx"),
				route("dashboard", "routes/dashboard.tsx"), // About at /about
			    route("profile", "routes/profile.tsx"),
                route("login", "routes/login/login.tsx"),
				route("workout", "routes/workout.tsx")
			   ] satisfies RouteConfig;
=======
export default [
  index("routes/home.tsx"),
  route("signup", "routes/signup.tsx"),
  route("dashboard", "routes/dashboard.tsx"), // About at /about
  route("profile", "routes/profile.tsx"),
  route("login", "routes/login/login.tsx"),
  route("leaderboard", "routes/leaderboard.tsx"),
  route("exercise", "routes/exercise.tsx"),
] satisfies RouteConfig;
>>>>>>> aaf7836830e4ae875e19f48bdf8387c9e18d2de8
