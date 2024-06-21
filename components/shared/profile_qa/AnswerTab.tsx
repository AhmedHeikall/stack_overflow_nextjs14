import Answercard from "@/components/cards/Answercard";
import NoResult from "@/components/shared/noresult/NoResult";

import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";

interface AnswerTabProps extends SearchParamsProps {
  userId: string;
  clerkId?: string;
}

const AnswerTab = async ({ searchParams, userId, clerkId }: AnswerTabProps) => {
  const results = await getUserAnswers({ userId, page: 1 });

  return (
    <>
      <div className="mt-10 flex w-full flex-col gap-6">
        {results.answers.length > 0 ? (
          results.answers.map((answer) => (
            <Answercard
              key={answer._id}
              _id={answer._id}
              clerkId={answer.author.clerkId}
              question={answer.question}
              author={answer.author}
              upvotes={answer.upvotes}
              createdAt={answer.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There’s no Answer to show"
            descrption=" Be the first to break the silence!"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default AnswerTab;
