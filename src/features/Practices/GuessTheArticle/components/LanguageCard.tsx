import { useTranslation } from "react-i18next";
import { Language } from "../../../../utils/types";
import Flag from "../../../../components/Flag";

interface LanguageCardProps {
  language: Language;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ language }) => {
  const { t } = useTranslation();

  return (
    <button className="bg-complementary-background-secondary py-2 rounded-lg max-w-44 border-2 border-complementary-border-primary shadow-lg drop-shadow-lg">
      <Flag flagCode={language.flagCode} />
      <p className="font-bold">{t(`languages.${language.nameKey}`)}</p>
      <p className="text-sm text-button-text">{language.articles.join("/")}</p>
    </button>
  );
};

export default LanguageCard;
