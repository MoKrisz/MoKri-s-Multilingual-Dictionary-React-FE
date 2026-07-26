import { Outlet } from "react-router-dom";
import Title from "../../../../components/Title";

export default function GuessArticleLayout() {
  return (
    <div className="w-3/4 mx-auto text-center max-w-screen-xl">
      <Title localeTitleKey="practices:guessArticle" />
      <Outlet />
    </div>
  );
}
