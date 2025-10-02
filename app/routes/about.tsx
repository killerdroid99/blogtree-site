import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "this is the about route" },
  ];
}

export default function About() {
  return <h1>About</h1>;
}
