import type { Route } from "./+types/home";
import Dashboard from "./dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Dashboard to React Router!" },
  ];
}

export default function Home() {
  return <Dashboard />;
}