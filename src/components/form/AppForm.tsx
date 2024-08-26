import React from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";

type AppFormProps<T extends FieldValues> = {
  schema?: ZodSchema<T>; // Optional validation schema
  onSubmit: SubmitHandler<T>; // Function to call on form submit
  children: React.ReactNode; // Form fields and other components
};

const AppForm = <T extends FieldValues>({
  schema,
  onSubmit,
  children,
}: AppFormProps<T>) => {
  const methods = useForm<T>({
    resolver: schema ? zodResolver(schema) : undefined,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default AppForm;
