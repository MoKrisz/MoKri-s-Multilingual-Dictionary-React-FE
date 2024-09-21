import React from "react";

interface ButtonProps {
  children: React.ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return <button className="bg-teal-600 font-bold p-2 rounded-lg">{children}</button>;
}
