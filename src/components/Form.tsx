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
  isSubmitting: boolean;
}

const Form = <T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  title,
  submitButtonText,
  isSubmitting,
}: FormProps<T>) => {
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const processForm = async (data: T) => {
    try {
      await onSubmit(data);

      methods.reset();
    } catch (error) {
      throw new Error("Form submission failed.");
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="justify-items-center">
        <h1 className="font-bold text-2xl m-3">{title}</h1>
        <form className="w-2/3" onSubmit={methods.handleSubmit(processForm)}>
          {children}
          <div className="flex justify-center my-3">
            <Button type="submit" isDisabled={isSubmitting}>
              {submitButtonText}
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default Form;
