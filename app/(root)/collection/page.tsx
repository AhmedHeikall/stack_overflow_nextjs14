import React from "react";

import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Filter from "@/components/shared/filter/Filter";
import NoResult from "@/components/shared/noresult/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";
import { QuestionFilters } from "@/constants/filters";

import { getSavedQuestion } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { SearchParamsProps } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collection | Dev Overflow",
  description: "Dev Overflow is a community of 1,000,000+ developers. join us.",
};

const Collection = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const results = await getSavedQuestion({
    clerkId: userId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/collection"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search questions...."
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
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
            title="There’s no saved question to show"
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

export default Collection;
