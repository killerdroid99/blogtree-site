import { Link } from "react-router";
import GoogleButton from "./GoogleButton";
import { useMeQuery, useUserLogout } from "~/utils/hooks";
import { useLocation } from "react-router";

const Header = () => {
  const { data, isLoading, error } = useMeQuery();
  const { mutate } = useUserLogout();
  const location = useLocation();
  return (
    <header className="flex justify-between items-center p-4">
      <Link to={"/"}>
        <h1 className="text-2xl font-semibold">
          Blog<span className="text-emerald-500">Tree</span>
        </h1>
      </Link>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : data?.userName ? (
        <div className="flex items-center gap-2">
          {location.pathname !== "/create" && (
            <Link
              to="/create"
              className=" text-white p-2 text-sm rounded-full ml-4 cursor-pointer hover:bg-emerald-600 hover:text-zinc-950 transition-all ease-in ring ring-inset flex items-center justify-center-safe gap-1 mr-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v12m6-6H6"
                />
              </svg>
              Create post
            </Link>
          )}
          <div className="rounded-full aspect-square size-8 overflow-hidden">
            <img
              src={
                data.pfp ??
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile Picture"
            />
          </div>
          <div className="font-semibold text-sm">{data.userName}</div>
          <button
            onClick={() => mutate()}
            className="bg-rose-500 text-white p-2 text-sm rounded ml-4 cursor-pointer hover:bg-rose-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <GoogleButton />
      )}
    </header>
  );
};

export default Header;
