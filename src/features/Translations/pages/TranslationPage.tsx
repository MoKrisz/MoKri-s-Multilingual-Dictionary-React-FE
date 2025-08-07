import Tabs from "../../../components/Tabs";
import Translation from "../../Translations/components/Translation";

export default function TranslationPage() {
  return (
    <>
      <div className="lg:w-3/4 lg:mx-auto max-w-screen-lg">
        <Tabs
          tabs={[
            {
              key: "translation",
              label: "Translation",
              content: <Translation />,
            },
          ]}
        />
      </div>
    </>
  );
}
