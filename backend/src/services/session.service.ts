import { DocumentType } from "@typegoose/typegoose";
import { omit } from "lodash";
import { privateFields, User } from "../models/user.model";
import { signJwt, verifyJwt } from "../utils/jwt";
import { ErrorBase } from "../utils/error";
import { createSession, findSessionById } from "../repository/session.repository";
import { findUserByEmail, findUserById } from "../repository/user.repository";

export function signAccessToken(user: DocumentType<User>) : string {
  const payload = omit(user.toJSON(), privateFields);

  const accessToken = signJwt(payload, "ACCESS_TOKEN_PRIVATE_KEY", {
    expiresIn: "15m",
  });

  return accessToken;
}

export async function signRefreshToken(userId: string): Promise<string> {
  const session = await createSession({
    userId,
  });
  const refreshToken = signJwt(
    {
      session: session._id,
    },
    "REFRESH_PRIVATE_KEY",
    {
      expiresIn: "1d",
    }
  );
  return refreshToken;
}

export async function signToken(
  email: string,
  password: string
): Promise<{ accessToken: string; refreshToken: string, respUser: Partial<DocumentType<User>> }> {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new ErrorBase({ statusCode: 401, message: "Invalid credentials" });
  }

  const isValid = await user.validatePassword(password);
  if (!isValid) {
    throw new ErrorBase({ statusCode: 401, message: "Invalid credentials" });
  }

  // sign a access token
  const accessToken = signAccessToken(user);

  // sign a refresh token
  const refreshToken = await signRefreshToken(user.id);

  const respUser = omit(user.toJSON(), privateFields);

  return { accessToken, refreshToken, respUser };
}

export async function signRefreshedAccessToken(refreshToken: string) : Promise<string> {
  const decoded = verifyJwt<{ session: string }>(
    refreshToken,
    "REFRESH_PUBLIC_KEY"
  );

  if (!decoded) {
    throw new ErrorBase({
      statusCode: 401,
      message: "Could not refresh access token",
    });
  }

  const session = await findSessionById(decoded.session);

  if (!session?.valid) {
    throw new ErrorBase({
      statusCode: 401,
      message: "Could not refresh access token",
    });
  }

  const user = await findUserById(String(session.user));

  if (!user) {
    throw new ErrorBase({
      statusCode: 401,
      message: "Could not refresh access token",
    });
  }

  return signAccessToken(user);
}


