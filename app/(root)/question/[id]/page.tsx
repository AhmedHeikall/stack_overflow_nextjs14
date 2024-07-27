import React from "react";
import Link from "next/link";
import Image from "next/image";

import Metric from "@/components/shared/metric/Metric";
import ParseHTML from "@/components/shared/parsehtml/ParseHTML";
import RenderTag from "@/components/shared/tags/RenderTag";
import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/allanswers/AllAnswers";
import Votes from "@/components/shared/votes/Votes";

import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { getTimestamp, formatAndDivideNumber } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Question | Dev Overflow",
  description: "Dev Overflow is a community of 1,000,000+ developers. join us.",
};
const QuestionDetails = async ({ params, searchParams }: any) => {
  const question = await getQuestionById({ questionId: params.id });

  // get userId and pass it to Answer form to know who made an answer
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  return (
    <>
      <div className="flex-start w-full flex-col">
        {/* author info and voting */}
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${question.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={question.author.picture}
              alt="profile picture"
              width={22}
              height={22}
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question.author.name}
            </p>
          </Link>
          {/* Voting System */}
          <div className="flex justify-end">
            <Votes
              type="question"
              itemId={JSON.stringify(question._id)}
              userId={JSON.stringify(mongoUser._id)}
              upvotes={question.upvotes.length}
              hasupVoted={question.upvotes.includes(mongoUser._id)}
              downvotes={question.downvotes.length}
              hasdownVoted={question.downvotes.includes(mongoUser._id)}
              hasSaved={mongoUser?.saved.includes(question._id)}
            />
          </div>
        </div>
        {/* question details */}
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>
      {/* question metrix */}
      <div className="mb-8 mt-5 flex flex-wrap gap-4 max-sm:gap-1.5">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={`Asked ${getTimestamp(question.createdAt)}`}
          title=""
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(question.answers.length)}
          title="Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(question.views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParseHTML content={question.content} />

      {/* render tags */}
      <div className="mt-8 flex flex-wrap gap-1">
        {question.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      {/* all answers  */}
      <AllAnswers
        authorId={mongoUser._id}
        questionId={question._id}
        totalAnswers={question.answers.length}
        filter={searchParams?.filter}
        page={searchParams?.page}
      />

      {/* answer form */}
      <Answer
        authorId={JSON.stringify(mongoUser._id)}
        questionId={JSON.stringify(question._id)}
        question={question.content}
      />
    </>
  );
};

export default QuestionDetails;
