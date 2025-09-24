import { useTranslation } from "react-i18next";

interface TitleProps {
  localeTitleKey: string;
}

const Title: React.FC<TitleProps> = ({ localeTitleKey }) => {
  const { t } = useTranslation();
  return <h1 className="font-bold text-2xl m-3 mb-8">{t(localeTitleKey)}</h1>;
};

export default Title;
