import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
				route("dashboard", "routes/dashboard.tsx"), // About at /about
                route("login", "routes/login/login.tsx")
			   ] satisfies RouteConfig;
