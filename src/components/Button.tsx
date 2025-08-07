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
        "bg-button-background text-button-text p-2 rounded-lg border border-button-border hover:bg-button-background-hover disabled:opacity-50 disabled:hover:bg-button-background transition-color duration-200 shadow-md",
        extraStyle
      )}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
