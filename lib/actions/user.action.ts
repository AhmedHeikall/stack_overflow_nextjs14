"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import {
  CreateUserParams,
  UpdateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
} from "./shared.types";

// import Question from "@/database/question.model";

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(userData: UpdateUserParams) {
  try {
    const { clerkId, updateData, path } = userData;

    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(userData: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = userData;

    const user = await User.find({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // Delete user from database
    // and their questions, comments etc..

    // there is an error here XXXXXXXXXXXXXXXXX

    // get user Questions ids
    // const userQuestionsIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );

    // // delete user questions
    // await Question.deleteMany({ author: user._id });

    // TODO: delete user answers, comments, etc.
    const deletedUser = await User.findByIdAndDelete({ clerkId });
    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();

    // const { page = 1, pageSize = 20, filter, searchQuery } = params;

    const users = await User.find({}).sort({ createdAt: -1 });

    return { users };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
