import React from "react";

import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import NoResult from "@/components/shared/noresult/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";

import { getQusetionsByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";

const TagDetails = async ({ params, searchParams }: URLProps) => {
  const tagId = params.id;

  const results = await getQusetionsByTagId({
    tagId,
    page: 1,
    searchQuery: searchParams.q,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{results.tagTitle}</h1>

      <div className="mt-11 w-full">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questions...."
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {/* Looping throw questions */}
        {results.questions.length > 0 ? (
          results.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There’s no tag question to show"
            descrption=" Be the first to break the silence! 🚀 Ask a Question and kickstart the
      discussion. our query could be the next big thing others learn from. Get
      involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default TagDetails;
