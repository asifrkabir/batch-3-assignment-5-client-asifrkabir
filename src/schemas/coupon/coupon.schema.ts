import { z } from "zod";

export const couponCreateSchema = z.object({
  code: z
    .string({ required_error: "This field is required" })
    .min(1, { message: "This field is required" }),
  discountPercentage: z
    .string({ required_error: "This field is required" })
    .transform((value) => Number(value))
    .refine((value) => value > 0 && value <= 100, {
      message: "Discount percentage must be between 1 and 100",
    }),
  // startTime: z
  //   .any()
  //   .refine((value) => dayjs.isDayjs(value) && value.isValid(), {
  //     message: "Invalid date",
  //   }),
  // endTime: z.any().refine((value) => dayjs.isDayjs(value) && value.isValid(), {
  //   message: "Invalid date",
  // }),
});

export const couponUpdateSchema = z.object({
  code: z
    .string({ required_error: "This field is required" })
    .min(1, { message: "This field is required" }),
  discountPercentage: z
    .string({ required_error: "This field is required" })
    .transform((value) => Number(value))
    .refine((value) => value > 0 && value <= 100, {
      message: "Discount percentage must be between 1 and 100",
    }),
  // startTime: z
  //   .any()
  //   .refine((value) => dayjs.isDayjs(value) && value.isValid(), {
  //     message: "Invalid date",
  //   }),
  // endTime: z.any().refine((value) => dayjs.isDayjs(value) && value.isValid(), {
  //   message: "Invalid date",
  // }),
});
