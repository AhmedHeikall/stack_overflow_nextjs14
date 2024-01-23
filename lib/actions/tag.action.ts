"use server";

import { connectToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams, GetAllTagsParams } from "./shared.types";

import User from "@/database/user.model";
import Tag from "@/database/tag.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    // Find the user
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // Find interactions for the user and group by tags
    // Interaction...model

    return [
      { _id: "1", name: "tag1" },
      { _id: "2", name: "tag2" },
      { _id: "3", name: "tag3" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const tags = await Tag.find({}).sort({ createdAt: -1 });

    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
