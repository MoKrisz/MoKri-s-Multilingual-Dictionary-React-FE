import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonType = "button" | "submit";

interface ButtonProps {
  type?: ButtonType;
  children: React.ReactNode;
  onClick?: () => void;
  extraStyle?: string;
  isDisabled?: boolean;
}

export default function Button({
  type,
  children,
  onClick,
  extraStyle,
  isDisabled = false,
}: ButtonProps) {
  return (
    <button
      type={type ?? "button"}
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
