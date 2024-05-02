"use server";

import Question from "@/database/question.model";
import Interaction from "@/database/interaction.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";

export async function viewQuestion(Params: ViewQuestionParams) {
  try {
    await connectToDatabase();

    const { questionId, userId } = Params;

    // update view count for the question
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    // check if user has interacted with this question before
    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction) return console.log("User has already viewed.");

      // create interaction
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
