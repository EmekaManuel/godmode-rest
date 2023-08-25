import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createSession } from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate the users password
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  //create a session
  const session = await createSession(user._id, req.get("userAgent") || "");
  // create an access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenLifeSpan") }
  );
  //create a refreshtoken
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenLifeSpan") }
  );
  //return botht tokens
  return res.send({ accessToken, refreshToken });
}
