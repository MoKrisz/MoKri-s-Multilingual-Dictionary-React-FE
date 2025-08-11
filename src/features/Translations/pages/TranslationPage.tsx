import { useTranslation } from "react-i18next";
import Tabs from "../../../components/Tabs";
import Translation from "../../Translations/components/Translation";

export default function TranslationPage() {
  const { t } = useTranslation("translation");

  return (
    <>
      <div className="lg:w-3/4 lg:mx-auto max-w-screen-lg">
        <Tabs
          tabs={[
            {
              key: "translation",
              label: t("translation"),
              content: <Translation />,
            },
          ]}
        />
      </div>
    </>
  );
}
