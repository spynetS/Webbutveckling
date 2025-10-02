import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
				route("dashboard", "routes/dashboard.tsx"), // About at /about
                route("login", "routes/login/login.tsx"),
                route("signup", "routes/signup.tsx"),
                route("exercise", "routes/exercise.tsx"),
                route("friends", "routes/friends.tsx")
			   ] satisfies RouteConfig;
