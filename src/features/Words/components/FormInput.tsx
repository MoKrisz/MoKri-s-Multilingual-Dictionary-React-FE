import React from "react";

interface FormInputProps {
  id: string;
  name: string;
  children: React.ReactNode;
  className: string;
}

export default function FormInput({
  id,
  name,
  children,
  className,
}: FormInputProps) {
  return (
    <>
      <label htmlFor={id} className={className}>
        {children}
      </label>
      <input type="text" id={id} name={name} className="rounded-lg border border-black bg-cream"></input>
    </>
  );
}
