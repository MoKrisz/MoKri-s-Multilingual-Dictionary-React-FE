import React from "react";
import Tabs from "../../../components/Tabs";
import TranslationGroupForm from "../components/TranslationGroupForm";
import BackButton from "../../../components/BackButton";
import { useTranslation } from "react-i18next";

const NewTranslationGroupPage: React.FC = () => {
  const { t } = useTranslation("translationGroups");
  return (
    <>
      <div className="lg:w-3/4 lg:mx-auto max-w-screen-lg">
        <BackButton returnTo="" />
        <Tabs
          tabs={[
            {
              key: "translation-group",
              label: t("translationGroup"),
              content: <TranslationGroupForm />,
            },
          ]}
        />
      </div>
    </>
  );
};

export default NewTranslationGroupPage;
