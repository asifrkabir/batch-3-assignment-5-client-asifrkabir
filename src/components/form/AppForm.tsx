/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";

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
  const methods = useForm({
    defaultValues,
    resolver: schema ? zodResolver(schema) : undefined,
  });

  // Update form values when defaultValues changes
  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
  }, [defaultValues, methods]);

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
