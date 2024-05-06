import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";

import NoResult from "@/components/shared/noresult/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";

interface QuestionTabProps extends SearchParamsProps {
  userId: string;
  clerkId?: string;
}

const QuestionTab = async ({
  searchParams,
  userId,
  clerkId,
}: QuestionTabProps) => {
  const results = await getUserQuestions({ userId, page: 1 });
  return (
    <>
      <div className="mt-10 flex w-full flex-col gap-6">
        {/* Looping throw questions */}
        {results.questions.length > 0 ? (
          results.questions.map((question) => (
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

export default QuestionTab;
