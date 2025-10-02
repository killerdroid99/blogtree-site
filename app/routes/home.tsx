import { useEffect } from "react";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then((res) => res.text())
      .then((data) => console.log(data));
  }, []);
  return <h1>Home</h1>;
}
