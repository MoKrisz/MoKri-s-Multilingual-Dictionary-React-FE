import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonType = "button" | "submit";

interface ButtonProps {
  type?: ButtonType;
  children: React.ReactNode;
  onClick?: () => void;
  extraStyle?: string;
  isDisabled?: boolean;
  isActive?: boolean;
}

export default function Button({
  type,
  children,
  onClick,
  extraStyle,
  isDisabled = false,
  isActive = false
}: ButtonProps) {
  return (
    <button
      type={type ?? "button"}
      className={twMerge(
        `${isActive ? "bg-button-background-hover" : "bg-button-background"} text-button-text p-2 rounded-lg border border-button-border hover:bg-button-background-hover disabled:opacity-50 disabled:hover:bg-button-background transition-color duration-200 shadow-md`,
        extraStyle
      )}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
