import { useTranslation } from "react-i18next";
import { Language } from "../../../../utils/types";
import Flag from "../../../../components/Flag";
import { Link } from "react-router-dom";

interface LanguageCardProps {
  language: Language;
  to?: string;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ language, to }) => {
  const { t } = useTranslation();

  return (
    <Link to={to ?? ""}>
      <button className="w-full bg-complementary-background-secondary py-2 rounded-lg max-w-44 border-2 border-complementary-border-primary shadow-lg drop-shadow-lg">
        <Flag flagCode={language.flagCode} />
        <p className="font-bold">{t(`languages.${language.nameKey}`)}</p>
        <p className="text-sm text-button-text">
          {language.articles.join("/")}
        </p>
      </button>
    </Link>
  );
};

export default LanguageCard;
