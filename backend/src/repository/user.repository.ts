import UserModel, { User } from "../models/user.model";

export function createUserRepository(input: Partial<User>) {
  try {
    const user = UserModel.create(input);
    return user;
  } catch (err: any) {
    throw new Error(err);
  }
}

export function findUserById(id: string) {
  return UserModel.findById(id);
}

export function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}
