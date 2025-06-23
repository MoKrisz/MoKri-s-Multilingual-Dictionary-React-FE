import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form";
import { ZodType } from "zod";
import Button from "./Button";

interface FormProps<T extends FieldValues> {
  schema: ZodType<T, any, T>;
  defaultValues?: UseFormProps<T>["defaultValues"];
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  title: string;
  submitButtonText: string;
}

const Form = <T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  title,
  submitButtonText,
}: FormProps<T>) => {
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <div className="justify-items-center">
        <h1 className="font-bold text-2xl m-3">{title}</h1>
        <form className="w-2/3" onSubmit={methods.handleSubmit(onSubmit)}>
          {children}
          <div className="flex justify-center my-3">
            <Button type="submit">{submitButtonText}</Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default Form;
