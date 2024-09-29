import React from "react";

export interface Option {
  value: number;
  name: string;
}

interface FormInputProps {
  id: string;
  name: string;
  children: React.ReactNode;
  className?: string;
  type?: string;
  options?: Option[];
}

export default function FormInput({
  id,
  name,
  children,
  className = "",
  type = "text",
  options = [],
}: FormInputProps) {
  let inputElement;

  if (type === "text") {
    inputElement = (
      <input
        type="text"
        id={id}
        name={name}
        className="rounded-lg border border-black bg-cream px-3 py-1"
      ></input>
    );
  }

  if (type === "select") {
    inputElement = (
      <select
        id={id}
        name={name}
        className="rounded-lg border border-black bg-cream px-2 py-1"
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value} className="bg-cream">
            {option.name}
          </option>
        ))}
      </select>
    );
  }

  return (
    <>
      <label htmlFor={id} className={className}>
        {children}
      </label>
      {inputElement}
    </>
  );
}
