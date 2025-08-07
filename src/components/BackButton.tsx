import { Link } from "react-router-dom";
import Button from "./Button";
import { IoReturnUpBack } from "react-icons/io5";

interface BackButtonProps {
  returnTo: string;
}

const BackButton: React.FC<BackButtonProps> = ({ returnTo }) => {
  return (
    <Link to={returnTo}>
      <Button extraStyle="mb-5 py-1 px-4">
        <IoReturnUpBack />
      </Button>
    </Link>
  );
};

export default BackButton;
