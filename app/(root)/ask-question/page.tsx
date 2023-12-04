import React from "react";
import Question from "@/components/forms/Question";

const AskQuestion = () => {
  return (
    <section className="">
      <h1 className="h1-bold text-dark100_light900">Ask a public quesiton</h1>
      <div className="mt-9">
        <Question />
      </div>
    </section>
  );
};

export default AskQuestion;
