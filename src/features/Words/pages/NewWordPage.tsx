import { Link, useNavigate } from "react-router-dom";
import { postWord, queryClient } from "../api";
import WordForm from "../components/WordForm";
import Tabs from "../../../components/Tabs";
import BackButton from "../../../components/BackButton";
import { useTranslation } from "react-i18next";

export default function NewWordPage() {
  const { t } = useTranslation("words");
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
              label: t("word"),
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
