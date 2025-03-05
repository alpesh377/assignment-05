import { z } from "zod";

const firstnameValidation = z
  .string()
  .min(3, { message: "Username must be at least 6 char longs" })
  .max(20, { message: "Username cannot exceed 20 characters" })
  .regex(
    /^[a-z0-9]{3,20}$/,
    "Username must not contain special characters or uppercase letters"
  );

const lastnameValidation = z
  .string()
  .min(3, { message: "Username must be at least 6 char longs" })
  .max(20, { message: "Username cannot exceed 20 characters" })
  .regex(
    /^[a-z0-9]{3,20}$/,
    "Username must not contain special characters or uppercase letters"
  );

const emailValidation = z.string().email({ message: "Invalid Email" });

const passwordvalidation = z
  .string()
  .min(8, { message: "Password must be 8 letters long" })
  .max(32, { message: "Password must not be longer than 32 letters" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Atleast one Uppercase letter",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Atleast one lowercase letter",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Atleast one Digit",
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: "Atleast one Special Character",
  });

export const signupSchema = z.object({
  firstname: firstnameValidation,
  lastname: lastnameValidation,
  email: emailValidation,
  password: passwordvalidation,
  mobileNumber: z
    .string()
    .min(10, "number must 10 digit long")
    .max(10, "enter 10 digit number"),
});
export const editProfileSchema = z.object({
  firstname: firstnameValidation,
  lastname: lastnameValidation,
  email: emailValidation,
  mobileNumber: z
    .string()
    .min(10, "number must 10 digit long")
    .max(10, "enter 10 digit number"),
});

export const signinSchema = z.object({
  email : emailValidation,
  password : passwordvalidation
})

export const changePasswordSchema = z
  .object({
    currentPassword: passwordvalidation,
    password: passwordvalidation,
    confirmPassword: passwordvalidation,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });