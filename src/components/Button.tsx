import React from "react";

interface ButtonProps {
  children: React.ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return (
    <button className="bg-lincolngreen font-bold p-2 rounded-lg border border-black hover:bg-lincolngreenlighter">
      {children}
    </button>
  );
}
