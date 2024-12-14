import { custom, z } from "zod";

export const ZodSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "Minimum 2 characters" })
      .max(25, { message: "Maximum 25 characters" }),
    lastName: z
      .string()
      .min(2, { message: "Minimum 2 characters" })
      .max(25, { message: "Maximum 25 characters" }),

    email: z.string().email({ message: "It's not a valid email" }),
    password: z
      .string()
      .min(4, { message: "Minmum 4 characters" })
      .max(8, { message: "Maximum 8 characters" }),
    confirmPassword: z
      .string()
      .min(4, { message: "Minmum 4 characters" })
      .max(8, { message: "Maximum 8 characters" }),

    profile: z.string().optional(),
    imageUrl: z.string().optional(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The password did not match",
        path: ["confirmPassword"],
      });
    }
  });
export type FormType = z.infer<typeof ZodSchema>;
