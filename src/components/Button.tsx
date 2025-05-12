import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button className={`bg-lincolngreen p-2 rounded-lg border border-black hover:bg-lincolngreenlighter ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
