import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorName: string;
  authorPicture: string | null;
}

export const useMeQuery = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()) as Promise<{
        userName?: string;
        pfp?: string;
      }>,
  });
};

export const useUserLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return (await res.json()) as { msg: string };
    },
    mutationKey: ["logout"],
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
};

export const usePostsQuery = (
  pageSize?: number | undefined,
  cursor?: number | undefined
) => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetch(
        `${import.meta.env.VITE_API_URL}/posts?pageSize=${pageSize}&cursor=${cursor}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json()) as Promise<{ posts: Post[] }>,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { title: string; content: string }) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          title: input.title,
          content: input.content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return (await res.json()) as { msg: string };
    },
    mutationKey: ["createPost"],
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
};
