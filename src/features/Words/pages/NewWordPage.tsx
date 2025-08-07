import { Link, useNavigate } from "react-router-dom";
import { postWord, queryClient } from "../api";
import WordForm from "../components/WordForm";
import Tabs from "../../../components/Tabs";
import BackButton from "../../../components/BackButton";

export default function NewWordPage() {
  const navigate = useNavigate();

  function onSuccess() {
    queryClient.invalidateQueries({ queryKey: ["words"] });
    navigate("/words");
  }

  return (
    <>
      <div className="lg:w-3/4 lg:mx-auto max-w-screen-lg">
        <BackButton returnTo="/words" />
        <Tabs
          tabs={[
            {
              key: "word",
              label: "Word",
              content: (
                <WordForm
                  mutationFunction={postWord}
                  onSuccessFunction={onSuccess}
                />
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
