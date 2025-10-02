import { useEffect } from "react";
import type { Route } from "./+types/home";
import GoogleButton from "../components/GoogleButton";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/auth/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <h1>
      <GoogleButton />
      Home
    </h1>
  );
}
