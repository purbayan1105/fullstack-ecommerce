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
      .min(8, { message: "Minmum 8 characters" })
      .max(16, { message: "Maximum 8 characters" })
      .regex(/[a-zA-Z]/, { message: "Must include at least one letter" })
      .regex(/\d/, { message: "Must include at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Must include at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Minmum 8 characters" })
      .max(16, { message: "Maximum 16 characters" }),

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
