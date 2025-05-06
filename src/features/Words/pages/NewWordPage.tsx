import { Link, useNavigate } from "react-router-dom";
import { postWord, queryClient } from "../api";
import WordForm from "../components/WordForm";
import TabButton from "../components/TabButton";

export default function NewWordPage() {
  const navigate = useNavigate();

  function onSuccess() {
    queryClient.invalidateQueries({ queryKey: ["words"] });
      navigate("/menu");
  }

  return <>
      <Link
        to="/menu"
        className="ml-12 inline-block py-1 px-4 bg-lincolngreen hover:bg-lincolngreenlighter rounded-md border border-green-900"
      >
        <button>Back</button>
      </Link>
      <div className="lg:w-3/4 lg:mx-auto max-w-screen-lg">
        <TabButton label="Word" className="-mb-px px-5 bg-lincolngreendarker rounded-t-xl border border-t-black border-l-black border-r-black border-b-lincolngreendarker"/>
        <div className="bg-lincolngreendarker rounded-e-3xl rounded-b-3xl border border-l-black border-r-black border-b-black border-t-black">
          <WordForm mutationFunction={postWord} onSuccessFunction={onSuccess} />
        </div>
      </div>
    </>;
}
