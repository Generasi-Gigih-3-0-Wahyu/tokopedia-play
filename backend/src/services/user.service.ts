import { omit } from "lodash";
import { User, privateFields } from "../models/user.model";
import { createUserRepository } from "../repository/user.repository";
import { ErrorBase } from "../utils/error";
import { conn } from "../utils/connectDb";
import { signToken } from "./session.service";
import { DocumentType } from "@typegoose/typegoose";

export async function createUser(input: Partial<User>) {
  const session = await conn.startSession();
  session.startTransaction({
    readConcern: { level: "snapshot" },
    writeConcern: { w: "majority" },
  });
  try {
    let newUser: Partial<{
      respUser: DocumentType<User>;
      accessToken: string;
      refreshToken: string;
    }> = {};
    const user = await createUserRepository(input);
    const { accessToken, refreshToken } = await signToken(
      user.email,
      input.password ?? ""
    );
    newUser = {
      respUser: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    await session.commitTransaction();
    return { ...newUser, respUser: omit(newUser.respUser?.toJSON(), privateFields) };
  } catch (err: any) {
    await session.abortTransaction();
    throw new ErrorBase({
      statusCode: err.code,
      message: err.message,
    });
  } finally {
    session.endSession();
  }
}
