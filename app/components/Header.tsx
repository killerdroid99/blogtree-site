import { Link } from "react-router";
import GoogleButton from "./GoogleButton";
import { useMeQuery, useUserLogout } from "~/utils/hooks";

const Header = () => {
  const { data, isLoading, error } = useMeQuery();
  const { mutate } = useUserLogout();
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
          <div className="rounded-full aspect-square, w-9 overflow-hidden">
            {data.pfp ? (
              <img src={data.pfp} alt="Profile Picture" />
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="Profile Picture"
              />
            )}
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
