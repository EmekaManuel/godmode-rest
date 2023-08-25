import { Request, Response } from "express";
import log from "../utils/logger";
import { createUser } from "../service/user.service";
import { createuserInput } from "../schema/user.schema";
import { omit } from "lodash";
import mongoose from "mongoose";
export async function createUserHandler(
  req: Request<{}, {}, createuserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);

    // Check if user is a Mongoose document before calling .toJSON()
    const userObject = user instanceof mongoose.Document ? user.toJSON() : user;

    return res.send(omit(userObject, "password"));
  } catch (error: any) {
    log.error(error);
    return res.status(409).send(error.message);
  }
}
