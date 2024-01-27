import React from "react";
import Link from "next/link";
import Image from "next/image";

import Metric from "@/components/shared/metric/Metric";
import ParseHTML from "@/components/shared/parsehtml/ParseHTML";
import RenderTag from "@/components/shared/tags/RenderTag";
import Answer from "@/components/forms/Answer";

import { getQuestionById } from "@/lib/actions/question.action";
import { getTimestamp, formatAndDivideNumber } from "@/lib/utils";

const QuestionDetails = async ({ params }: any) => {
  const question = await getQuestionById({ questionId: params.id });

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
          <div className="flex justify-end">VOTING</div>
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

      {/* answer form */}
      <Answer />
    </>
  );
};

export default QuestionDetails;
