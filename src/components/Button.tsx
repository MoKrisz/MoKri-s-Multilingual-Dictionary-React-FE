import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  extraStyle?: string;
  isDisabled?: boolean;
}

export default function Button({
  children,
  onClick,
  extraStyle,
  isDisabled = false,
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "bg-lincolngreen p-2 rounded-lg border border-black hover:bg-lincolngreenlighter disabled:opacity-50 disabled:hover:bg-lincolngreen",
        extraStyle
      )}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
