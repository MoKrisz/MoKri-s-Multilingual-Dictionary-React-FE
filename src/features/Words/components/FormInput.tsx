import React, { ChangeEvent, useEffect, useState } from "react";
import { LanguageCodeEnum } from "../models";

export interface Option {
  value: number | string;
  name: string;
}

interface FormInputProps {
  id: string;
  name: string;
  children: React.ReactNode;
  className?: string;
  type?: string;
  options?: Option[];
  disabled?: boolean;
  onChange?: (language: number) => void;
}

export default function FormInput({
  id,
  name,
  children,
  className = "",
  type = "text",
  options = [],
  disabled = false,
  onChange,
}: FormInputProps) {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    console.log("megfut a disable.");
    if (disabled) {
      setText("");
    }
  }, [disabled]);

  let inputElement;

  if (type === "text") {
    inputElement = (
      <input
        type="text"
        id={id}
        name={name}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="rounded-lg border border-black bg-cream px-3 py-1 disabled:opacity-50"
        disabled={disabled}
      ></input>
    );
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    if (onChange) {
      const selectedLanguageValue = Number(event.target.value);
      onChange(selectedLanguageValue);
    }
  }

  if (type === "select") {
    inputElement = (
      <select
        id={id}
        name={name}
        className="rounded-lg border border-black bg-cream px-2 py-1 disabled:opacity-50"
        onChange={(event) => {
          handleSelectChange(event);
        }}
        disabled={disabled}
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
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id}>{children}</label>
      {inputElement}
    </div>
  );
}
