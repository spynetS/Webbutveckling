import type { Route } from "./+types/home";
import Login from "./login/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Dashboard to React Router!" },
  ];
}

export default function Home() {
  return <Login />;
}
