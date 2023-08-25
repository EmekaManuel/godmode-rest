import { TypeOf, object, string } from "zod";

export const createUserschema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    email: string({ required_error: "Email is required" }).email(
      "Invalid Email"
    ),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password is too short - should be 6 chars minimum"),

    confirmPassword: string({
      required_error: "Confirm Password",
    }),
  }).refine(
    (data) => (
      data.password === data.confirmPassword,
      {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      }
    )
  ),
});

export type createuserInput = Omit<
  TypeOf<typeof createUserschema>,
  "body.confirmPassword"
>;
