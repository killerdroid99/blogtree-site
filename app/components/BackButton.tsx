import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="absolute top-10 left-[9dvw] size-fit bg-zinc-950 cursor-pointer"
    >
      <ArrowLeft />
    </button>
  );
};

export default BackButton;
