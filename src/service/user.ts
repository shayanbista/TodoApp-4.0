import bcrypt from "bcrypt";
import { User } from "../interface/user";
import * as userModel from "../model/user";
import { Roles } from "../constant/Roles";
import { permissions } from "../constant/Permission";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("User Service");

export const createUser = async (user: User) => {
  const existingUser = getUserByEmail(user.email);
  if (existingUser) {
    return null;
  } else {
    const password = await bcrypt.hash(user.password, 10);
    const userRole = Roles.USER;
    user.role = Roles.USER;
    user.permissions = permissions[Roles.USER];
    const newUser = userModel.createUser({ ...user, password });
    logger.info("User created");
    return true;
  }
};

export const getUsers = () => {
  const users = userModel.getUsers();
  if (users.length == 0) {
    return null;
  } else return users;
};

export const getUserByEmail = (email: string) => {
  return userModel.getUserByEmail(email);
};

export const getUserById = (id: number) => {
  const index = userModel.findUserIndex(id);
  if (index == -1) return null;
  else return userModel.getUserByIndexId(index);
};

export const updateUser = async (id: number, user: User) => {
  let password: string;

  // find the index of user
  const usersIndex = userModel.findUserIndex(id);

  if (usersIndex === -1) throw new Error("User not found");
  const existingUser = userModel.getUserByIndexId(id);

  // check the password from request
  if (user.password) {
    password = await bcrypt.hash(user.password, 10);
  } else {
    password = existingUser.password;
  }
  logger.info("password", password);
  user.password = password;
  userModel.updateUser(id, user, usersIndex);
  return { message: "User updated" };
};

export const deleteUsers = (id: number) => {
  const usersIndex = userModel.findUserIndex(id);
  if (usersIndex === -1) throw new Error("users not found");
  userModel.deleteUser(usersIndex);
  logger.info("User deleted");
  return { message: "users deleted" };
};
