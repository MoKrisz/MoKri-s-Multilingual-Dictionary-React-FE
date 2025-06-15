import FeaturePick from "../components/FeaturePick";
import { Link } from "react-router-dom";
import WordOData from "../features/Words/components/WordOData";

export default function MenuPage() {
  return (
    <>
      <section className="h-1/2 md:h-1/4 mt-10 flex flex-col md:flex-row gap-5 items-center justify-evenly border border-blue-800">
        <Link to="new-word" className="w-2/3 h-1/2 md:w-1/6 md:h-full">
          <FeaturePick>Add Word</FeaturePick>
        </Link>
        <Link to="translation" className="w-2/3 h-1/2 md:w-1/6 md:h-full">
          <FeaturePick>Add Translation</FeaturePick>
        </Link>
      </section>
      <section className="w-2/3 flex flex-col justify-self-center border border-slate-900">
        <WordOData />
      </section>
    </>
  );
}
