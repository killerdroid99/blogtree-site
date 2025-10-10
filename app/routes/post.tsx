import type { Route } from "./+types/home";
import { usePostQuery, usePostsQuery } from "~/utils/hooks";
import { Link, useParams } from "react-router";
import Markdown from "react-markdown";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize from "rehype-sanitize";
import { useMemo } from "react";
import { format, isToday, isYesterday } from "date-fns";
import BackButton from "~/components/BackButton";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "BlogTree" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Post() {
  let params = useParams() as { id: string };
  const { data, isLoading, error } = usePostQuery(+params.id);

  const createdAtText = useMemo(() => {
    if (!data?.post.createdAt) return "";

    if (isToday(data.post.createdAt)) {
      return "Published today";
    } else if (isYesterday(data.post.createdAt)) {
      return "Published yesterday";
    } else return `Published on ${format(data.post.createdAt, "PP")}`;
  }, [data?.post.createdAt]);

  return (
    <div className="pt-20 px-[9dvw] lg:px-[18dvw] relative">
      <BackButton />

      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : data ? (
        <article className="prose prose-zinc dark:prose-invert md:prose-lg lg:prose-xl max-w-none mb-5">
          <div className="text-sm mb-5">
            <div className="flex items-center">
              By
              <img
                className="rounded-full size-7 overflow-hidden ring-1 ring-zinc-700 grid place-items-center ml-2 mr-1"
                src={
                  data.post.authorPicture ??
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="profile picture"
              />
              {data.post.authorName}
            </div>
            <time>{createdAtText}</time>
          </div>
          <h1 className="mt-10">{data.post.title}</h1>
          <hr />
          <Markdown
            remarkPlugins={[remarkParse, remarkGfm]}
            rehypePlugins={[remarkRehype, rehypeStringify, rehypeSanitize]}
          >
            {data.post.content}
          </Markdown>
        </article>
      ) : null}
    </div>
  );
}
