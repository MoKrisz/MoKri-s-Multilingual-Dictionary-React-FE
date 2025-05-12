import { Link, useNavigate } from "react-router-dom";
import { postWord, queryClient } from "../api";
import WordForm from "../components/WordForm";
import Tabs from "../../../components/Tabs";

export default function NewWordPage() {
  const navigate = useNavigate();

  function onSuccess() {
    queryClient.invalidateQueries({ queryKey: ["words"] });
    navigate("/menu");
  }

  return (
    <>
      <Link
        to="/menu"
        className="ml-12 inline-block py-1 px-4 bg-lincolngreen hover:bg-lincolngreenlighter rounded-md border border-green-900"
      >
        <button>Back</button>
      </Link>
      <div className="lg:w-3/4 lg:mx-auto max-w-screen-lg">
        <Tabs
          tabs={[{ key: "word", label: "Word", content: <WordForm mutationFunction={postWord} onSuccessFunction={onSuccess} />, length: 5 }]}
          defaultTab="word"
        />
      </div>
    </>
  );
}
