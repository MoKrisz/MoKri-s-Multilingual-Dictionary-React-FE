import { twMerge } from "tailwind-merge";

export interface TextInputProps {
  inputValue: string;
  setInputValue: (newValue: string) => void;
  label?: string;
  extraStyle?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  inputValue,
  setInputValue,
  label,
  extraStyle,
}) => {
  return (
    <>
      {label && <label className="whitespace-nowrap">{label}</label>}
      <input
        className={twMerge(
          "px-2 py-1 bg-lincolngreen focus:bg-lincolngreenlighter rounded-md",
          extraStyle
        )}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </>
  );
};

export default TextInput;
