import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useMeQuery = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        credentials: "include",
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
