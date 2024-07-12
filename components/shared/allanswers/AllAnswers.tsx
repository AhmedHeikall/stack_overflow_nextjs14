import React from "react";
import Link from "next/link";
import Image from "next/image";

import Filter from "../filter/Filter";
import Votes from "../votes/Votes";
import Pagination from "../pagination/Pagination";

import { getAnswers } from "@/lib/actions/answer.action";
import { AnswerFilters } from "@/constants/filters";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "../parsehtml/ParseHTML";

interface Props {
  questionId: string;
  authorId: string;
  totalAnswers: number;
  filter?: string;
  page?: number;
}
const AllAnswers = async ({
  questionId,
  authorId,
  totalAnswers,
  filter,
  page,
}: Props) => {
  const result = await getAnswers({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
  });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between ">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        {/* answers filter  TODO:ADD SOME STYLES */}
        <Filter
          filters={AnswerFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      {/* answers */}
      <div>
        {result.answers.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="flex items-center justify-between">
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={answer.author.picture}
                    alt="user priofile"
                    width={18}
                    height={18}
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700 mr-1">
                      {answer.author.name}
                    </p>
                    <p className="small-regular text-light400_light500 mt-0.5 line-clamp-1">
                      answerd {getTimestamp(answer.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <Votes
                    type="answer"
                    itemId={JSON.stringify(answer._id)}
                    userId={JSON.stringify(authorId)}
                    upvotes={answer.upvotes.length}
                    hasupVoted={answer.upvotes.includes(authorId)}
                    downvotes={answer.downvotes.length}
                    hasdownVoted={answer.downvotes.includes(authorId)}
                  />
                </div>
              </div>
              {/* SPAN ID */}
            </div>
            <ParseHTML content={answer.content} />
          </article>
        ))}
      </div>

      <Pagination pageNumber={page ? +page : 1} isNext={result.isNext} />
    </div>
  );
};

export default AllAnswers;
