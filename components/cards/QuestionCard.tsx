import React from "react";
import Link from "next/link";

import RenderTag from "../shared/tags/RenderTag";
import Metric from "../shared/metric/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";

interface HomeCardQuestionProps {
  _id: string;
  title: string;
  author: { _id: string; name: string; picture: string };
  tags: { _id: string; name: string }[];
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const QuestionCard = ({
  _id,
  title,
  author,
  tags,
  upvotes,
  views,
  answers,
  createdAt,
}: HomeCardQuestionProps) => {
  return (
    <div className=" background-light900_dark200  rounded-[10px]  p-9 shadow-md sm:px-11">
      {/* Title and (Date  in small devices) */}
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
        {/* If signed in add edit delete actions */}
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <div>
          <Metric
            imgUrl={author.picture}
            alt="user"
            value={author.name}
            title={` - asked ${getTimestamp(createdAt)}`}
            href={`/profile/${author._id}`}
            isAuthor={true}
            textStyles="body-medium text-dark400_light700"
          />
        </div>

        <div className="flex-between flex-wrap gap-3 max-sm:gap-1.5">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={formatAndDivideNumber(upvotes)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="message"
            value={formatAndDivideNumber(answers.length)}
            title="Answers"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            value={formatAndDivideNumber(views)}
            title=" Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
