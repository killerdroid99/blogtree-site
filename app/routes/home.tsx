import { useEffect } from "react";
import type { Route } from "./+types/home";
import { useQuery } from "@tanstack/react-query";
import { useMeQuery } from "~/utils/hooks";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <h1>Home</h1>;
}
