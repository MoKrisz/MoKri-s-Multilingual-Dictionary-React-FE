import { useState } from "react";
import { HiQuestionMarkCircle } from "react-icons/hi";

interface TooltipProps {
  text: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-flex items-center">
      <HiQuestionMarkCircle
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      />
      <div
        className={`absolute z-10 px-3 py-1 text-sm text-center text-white bg-gray-800 rounded shadow-lg bottom-full left-1/2 -translate-x-1/2 w-screen max-w-md transition-opacity duration-200 pointer-events-none ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {text}
      </div>
    </div>
  );
};
