import type { Route } from "./+types/home";
import { usePostsQuery } from "~/utils/hooks";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "BlogTree - Home" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { data, isLoading, error } = usePostsQuery(5);

  return (
    <div className="pt-10 px-[9dvw] lg:px-[18dvw]">
      <h3 className="text-lg font-semibold mb-5">Latest posts</h3>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : data ? (
        <div className="flex flex-col gap-y-5">
          {data.posts.map((post) => (
            <Link to={`/posts/${post.id}`} key={post.id}>
              <div className="bg-gradient-to-br from-zinc-800 via-slate-800 to-zinc-800 p-8 rounded-2xl ring-2 ring-zinc-800 hover:grayscale-25 transition-colors ease-in">
                <h2 className="font-black text-xl">{post.title}</h2>
                <span className="text-sm">by {post.authorName}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
