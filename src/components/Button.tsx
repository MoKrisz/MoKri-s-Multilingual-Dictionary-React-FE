import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isDisabled?: boolean;
}

export default function Button({
  children,
  onClick,
  className,
  isDisabled = false,
}: ButtonProps) {
  return (
    <button
      className={`bg-lincolngreen p-2 rounded-lg border border-black hover:bg-lincolngreenlighter disabled:opacity-50 disabled:hover:bg-lincolngreen ${className}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
