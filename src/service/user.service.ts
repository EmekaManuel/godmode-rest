import { omit } from "lodash";
import UserModel, { UserInput } from "../models/user.model";

export async function createUser(input: UserInput) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new Error(error);
  }
}

export interface ValidatePasswordInput {
  email: string;
  password: string;
}

export async function validatePassword(input: ValidatePasswordInput) {
  const user = await UserModel.findOne({ email: input.email });
  if (!user) return false;
  const isValid = await user.comparePassword(input.password);
  if (!isValid) return false;
  return omit(user.toJSON(), "password");
}
