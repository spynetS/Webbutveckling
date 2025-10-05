import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("signup", "routes/signup.tsx"),
  route("dashboard", "routes/dashboard.tsx"), // About at /about
  route("profile", "routes/profile.tsx"),
  route("login", "routes/login/login.tsx"),
  route("leaderboard", "routes/leaderboard.tsx"),
  //route("exercise", "routes/exercise.tsx"),
  route("workout", "routes/workout.tsx"),
  route("friends", "routes/friends.tsx"),
<<<<<<< HEAD
  route("notifications", "routes/notifications.tsx")

] satisfies RouteConfig;
=======
] satisfies RouteConfig;
>>>>>>> origin
