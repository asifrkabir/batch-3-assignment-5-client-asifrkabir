import { z } from "zod";

export const profileUpdateSchema = z.object({
  name: z
    .string({ required_error: "This field is required" })
    .min(1, { message: "This field is required" }),
  email: z
    .string({ required_error: "This field is required" })
    .email()
    .min(1, { message: "This field is required" }),
  phone: z
    .string({ required_error: "This field is required" })
    .min(1, { message: "This field is required" }),
  address: z
    .string({ required_error: "This field is required" })
    .min(1, { message: "This field is required" }),
});
