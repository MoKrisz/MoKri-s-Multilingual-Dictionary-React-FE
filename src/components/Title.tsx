import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

interface TitleProps {
  localeTitleKey: string;
  extraStyle?: string;
}

export default function Title({ localeTitleKey, extraStyle }: TitleProps) {
  const { t } = useTranslation();

  return (
    <h1 className={twMerge("font-bold text-2xl m-3 mb-8", extraStyle)}>
      {t(localeTitleKey)}
    </h1>
  );
}
