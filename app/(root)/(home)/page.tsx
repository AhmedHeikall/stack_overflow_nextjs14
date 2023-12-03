import React from "react";
import Link from "next/link";

import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Filter from "@/components/shared/filter/Filter";
import HomeFilters from "@/components/home/HomeFilters";
import NoResult from "@/components/shared/noresult/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";
import { Button } from "@/components/ui/button";

import { HomePageFilters } from "@/constants/filters";

const QUESTIONS = [
  {
    _id: "1",
    title: "Cascading Deletes in SQLAlchemy?",
    tags: [
      { _id: "1", name: "Python" },
      { _id: "2", name: "SQL" },
    ],
    author: { _id: "1", name: "Ahmed Heikal", picture: "/path/to/picture.jpg" },
    upvotes: 1000000,
    views: 3000000,
    answers: [],
    createdAt: new Date("2023-11-01T12:00:00.000Z"),
  },
  {
    _id: "2",
    title: "Managing State in React?",
    tags: [
      { _id: "3", name: "React" },
      { _id: "4", name: "State Management" },
    ],
    author: { _id: "2", name: "John Doe", picture: "/path/to/picture.jpg" },
    upvotes: 50000,
    views: 4000,
    answers: [],
    createdAt: new Date("2023-11-02T09:30:00.000Z"),
  },
  {
    _id: "3",
    title: "REST vs GraphQL: Pros and Cons",
    tags: [
      { _id: "5", name: "REST" },
      { _id: "6", name: "GraphQL" },
    ],
    author: { _id: "3", name: "Jane Smith", picture: "/path/to/picture.jpg" },
    upvotes: 20,
    views: 5000,
    answers: [],
    createdAt: new Date("2023-11-03T15:45:00.000Z"),
  },
];

const Home = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href={`/ask-question`} className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search questions...."
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {/* Looping throw questions */}
        {QUESTIONS.length > 0 ? (
          QUESTIONS.map((question) => (
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
            title="There’s no question to show"
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

export default Home;
