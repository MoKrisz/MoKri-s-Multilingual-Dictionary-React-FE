import React from "react";
import Tabs from "../../../components/Tabs";
import TranslationGroupForm from "../components/TranslationGroupForm";
import BackButton from "../../../components/BackButton";

const NewTranslationGroupPage: React.FC = () => {
  return (
    <>
      <div className="lg:w-3/4 lg:mx-auto max-w-screen-lg">
        <BackButton returnTo="" />
        <Tabs
          tabs={[
            {
              key: "translation-group",
              label: "Translation group",
              content: <TranslationGroupForm />,
            },
          ]}
        />
      </div>
    </>
  );
};

export default NewTranslationGroupPage;
