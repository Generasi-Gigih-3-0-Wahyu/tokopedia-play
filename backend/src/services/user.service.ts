import { omit } from "lodash";
import { User, privateFields } from "../models/user.model";
import { createUserRepository } from "../repository/user.repository";
import { ErrorBase } from "../utils/error";

export async function createUser(input: Partial<User>) {
  try {
    const user = await createUserRepository(input);
    return omit(user.toJSON(), privateFields);
  } catch (err: any) {
    throw new ErrorBase({statusCode: err.code, message: err.message});
  }
}
