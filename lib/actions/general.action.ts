"use server";

import { SearchParams } from "./shared.types";
import { connectToDatabase } from "../mongoose";

import Question from "@/database/question.model";
import User from "@/database/user.model";
import Answer from "@/database/answer.model";
import Tag from "@/database/tag.model";

const SearchableTypes = ["question", "user", "answer", "tag"];

export async function globalSearch(params: SearchParams) {
  try {
    await connectToDatabase();

    const { query, type } = params;
    const regexQuery = { $regex: query, $options: "i" };

    let results: any = [];

    const modelsAndTypes = [
      { model: Question, searchFiled: "title", type: "question" },
      { model: User, searchFiled: "name", type: "user" },
      { model: Answer, searchFiled: "content", type: "answer" },
      { model: Tag, searchFiled: "name", type: "tag" },
    ];

    const typeLower = type?.toLowerCase();

    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      // SEARCH ACROSS EVERYTHING -> types filter not turned on

      for (const { model, searchFiled, type } of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchFiled]: regexQuery })
          .limit(2);

        results.push(
          ...queryResults.map((item) => ({
            title:
              type === "answer"
                ? `Answers containing ${query}`
                : item[searchFiled],
            type,
            id:
              type === "user"
                ? item.clerkId
                : type === "answer"
                ? item.question
                : item._id,
          }))
        );
      }
    } else {
      //  SEARCH IN THE SPECIFIED MODEL TYPE -> "model"

      const modelInfo = modelsAndTypes.find((item) => item.type === type);

      if (!modelInfo) {
        throw new Error("invalid search type");
      }

      const queryResults = await modelInfo.model
        .find({
          [modelInfo.searchFiled]: regexQuery,
        })
        .limit(8);

      results = queryResults.map((item) => ({
        title:
          type === "answer"
            ? `Answers containing ${query}`
            : item[modelInfo.searchFiled],
        type,
        id:
          type === "user"
            ? item.clerkId
            : type === "answer"
            ? item.question
            : item._id,
      }));
    }

    return JSON.stringify(results);
  } catch (error) {
    console.log(`Error Throw fetching Global Results: ${error}`);
    throw error;
  }
}
