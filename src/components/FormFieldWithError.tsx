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
  return (
    <div className={twMerge("flex flex-col", extraStyle)}>
      <label htmlFor={htmlFor} className="font-bold">
        {label}
      </label>
      {children}
      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
};

export default FormFieldWithError;
