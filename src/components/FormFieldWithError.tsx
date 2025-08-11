import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

interface FormFieldWithErrorProps {
  children: React.ReactNode;
  error?: string;
  extraStyle: string;
  htmlFor: string;
  label: string;
}

const FormFieldWithError: React.FC<FormFieldWithErrorProps> = ({
  children,
  error,
  extraStyle,
  htmlFor,
  label,
}) => {
  const { t } = useTranslation();
  return (
    <div className={twMerge("flex flex-col", extraStyle)}>
      <label htmlFor={htmlFor} className="font-bold">
        {label}
      </label>
      {children}
      {error && <span className="text-red-600">{t(error)}</span>}
    </div>
  );
};

export default FormFieldWithError;
