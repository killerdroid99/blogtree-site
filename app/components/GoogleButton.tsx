import { Link } from "react-router";

const GoogleButton = () => {
  return (
    <Link to={`${import.meta.env.VITE_API_URL}/auth/login/google`}>
      Sign in with google
    </Link>
  );
};

export default GoogleButton;
