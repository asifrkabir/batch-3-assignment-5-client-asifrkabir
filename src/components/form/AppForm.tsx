/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";

type TAppFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type AppFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: React.ReactNode;
  schema?: ZodSchema<FieldValues>;
  defaultValues?: Record<string, any>;
  resetAfterSubmit?: boolean;
};

const AppForm = ({
  onSubmit,
  children,
  schema,
  defaultValues,
  resetAfterSubmit = false,
}: AppFormProps) => {
  const formConfig: TAppFormConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (schema) {
    formConfig["resolver"] = zodResolver(schema);
  }

  const methods = useForm(formConfig);

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    await onSubmit(data);
    if (resetAfterSubmit) {
      methods.reset();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default AppForm;
