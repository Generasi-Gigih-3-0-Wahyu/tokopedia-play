import { omit } from "lodash";
import { User, privateFields } from "../models/user.model";
import { createUserRepository } from "../repository/user.repository";

export async function createUser(input: Partial<User>) {
  try {
    const user = await createUserRepository(input);
    return omit(user.toJSON(), privateFields);
  } catch (err: any) {
    throw new Error(err);
  }
}
