import { z } from "zod";

export const SignUpFormSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters long" })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email" }).trim(),
  password: z
    .string()
    .min(5, { message: "Be at least 5 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contains at least one letter" })
    .regex(/[0-9]/, { message: "Contains at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export type FormState = | {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[]
    }
} | undefined;

export const SignInFormSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }).trim(),
    password: z.string().min(5, { message: "Be at least 5 characters long" }).trim()
});

export type SignInFormState = | {
    errors?: {
        email?: string[];
        password?: string[]
    }
} | undefined;