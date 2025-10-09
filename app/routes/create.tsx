import { Link, useNavigate } from "react-router";
import type { Route } from "./+types/home";
import { ArrowLeft } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize from "rehype-sanitize";
import { useEffect, useRef, useState } from "react";
import { useCreatePost } from "~/utils/hooks";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "BlogTree - Create Post" },
    { name: "description", content: "Welcome to BlogTree!" },
  ];
}

export default function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setShowPreview(false);
      }
    });

    return () => {
      window.removeEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          setShowPreview(false);
        }
      });
    };
  }, []);

  const { mutate: createPost, isError } = useCreatePost();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const content = formData.get("content");
    if (!title || !content) return;
    console.log({ title, content });
    createPost({ title: title as string, content: content as string });
    if (!isError) navigate("/");
  };

  return (
    <div className="p-4 px-[18dvw] relative">
      {showPreview && (
        <div
          onClick={(e) => e.target === e.currentTarget && setShowPreview(false)}
          className="bg-zinc-950/50 backdrop-blur-md fixed inset-0 z-10 px-[9dvw] lg:px-[18dvw] py-16 overflow-scroll"
        >
          <article className="prose prose-zinc dark:prose-invert md:prose-lg lg:prose-xl max-w-none p-4 bg-zinc-900 rounded-xl">
            <h1>{title}</h1>
            <Markdown
              remarkPlugins={[remarkParse, remarkGfm]}
              rehypePlugins={[remarkRehype, rehypeStringify, rehypeSanitize]}
            >
              {content}
            </Markdown>
          </article>
        </div>
      )}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-10 left-[9dvw] size-fit bg-zinc-950 cursor-pointer"
      >
        <ArrowLeft />
      </button>

      <h1 className="text-4xl font-semibold text-center my-10">
        ✏️ Craft your unique story...
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          className="w-full p-4 outline-1 outline-zinc-500 rounded-xl focus-visible:outline-zinc-300 text-xl transition-all ease-in"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <textarea
          name="content"
          id=""
          cols={30}
          rows={20}
          placeholder="Markdown syntax is supported..."
          className="w-full p-4 outline-1 outline-zinc-500 rounded-xl focus-visible:outline-zinc-300 resize-none transition-all ease-in"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />

        <div className="flex items-center gap-5">
          <button
            type="submit"
            className="p-4 rounded-xl bg-emerald-600 text-zinc-950 cursor-pointer hover:bg-emerald-700 transition-all ease-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Create Post
          </button>
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="p-4 rounded-xl bg-indigo-400 text-zinc-950 cursor-pointer hover:bg-indigo-600 transition-all ease-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Preview
          </button>
        </div>
      </form>
    </div>
  );
}
