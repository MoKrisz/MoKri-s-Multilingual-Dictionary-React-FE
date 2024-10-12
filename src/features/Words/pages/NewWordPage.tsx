import { useNavigate } from "react-router-dom";
import { postWord, queryClient } from "../api";
import WordForm from "../components/WordForm";

export default function NewWordPage() {
  const navigate = useNavigate();
  
  function onSuccess() {
    queryClient.invalidateQueries({ queryKey: ["words"] });
    navigate("/menu");
  }

  return <WordForm mutationFunction={postWord} onSuccessFunction={onSuccess} />;
}
