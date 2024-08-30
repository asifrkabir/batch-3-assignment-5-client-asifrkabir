import dayjs from "dayjs";
import { z } from "zod";

export const bikeCreateSchema = z.object({
  name: z
    .string({ required_error: "This field is required" })
    .min(1, { message: "This field is required" }),
  description: z
    .string({ required_error: "This field is required" })
    .min(1, { message: "This field is required" }),
  pricePerHour: z
    .string({ required_error: "This field is required" })
    .transform((value) => Number(value))
    .refine((value) => value > 0, {
      message: "Price per hour must be a positive number",
    }),
  cc: z
    .string({ required_error: "This field is required" })
    .transform((value) => Number(value))
    .refine((value) => value > 0, { message: "CC must be a positive number" }),
  year: z.any().refine((value) => dayjs.isDayjs(value) && value.isValid(), {
    message: "Invalid date",
  }),
  model: z
    .string({ required_error: "This field is required" })
    .min(1, { message: "This field is required" }),
  brand: z
    .string({ required_error: "This field is required" })
    .min(1, { message: "This field is required" }),
  image: z.any().optional(),
});

export const bikeUpdateSchema = z.object({
  name: z
    .string({ required_error: "This field is required" })
    .min(1, { message: "This field is required" }),
  description: z
    .string({ required_error: "This field is required" })
    .min(1, { message: "This field is required" }),
  pricePerHour: z
    .string({ required_error: "This field is required" })
    .transform((value) => Number(value))
    .refine((value) => value > 0, {
      message: "Price per hour must be a positive number",
    }),
  cc: z
    .string({ required_error: "This field is required" })
    .transform((value) => Number(value))
    .refine((value) => value > 0, { message: "CC must be a positive number" }),
  year: z.any().refine((value) => dayjs.isDayjs(value) && value.isValid(), {
    message: "Invalid date",
  }),
  model: z
    .string({ required_error: "This field is required" })
    .min(1, { message: "This field is required" }),
  brand: z
    .string({ required_error: "This field is required" })
    .min(1, { message: "This field is required" }),
  image: z.string().optional(),
  newImage: z.any().optional(),
});
