import { Link } from "react-router-dom";
import Tabs from "../../../components/Tabs";
import Translation from "../../Translations/components/Translation";

export default function TranslationPage() {
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
