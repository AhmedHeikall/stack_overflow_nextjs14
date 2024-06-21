import Link from "next/link";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { SignedIn, auth } from "@clerk/nextjs";
import Metric from "../shared/metric/Metric";
import EditDeleteAction from "../shared/editdeleteactions/EditDeleteAction";

interface AnswerCardProps {
  _id: string;
  clerkId: string;
  author: { _id: string; name: string; picture: string; clerkId: string };
  question: { _id: string; title: string };
  upvotes: Array<object>;
  createdAt: Date;
}

const Answercard = ({
  _id,
  clerkId,
  question,
  author,
  upvotes,
  createdAt,
}: AnswerCardProps) => {
  // compare current user clerkId with author clerkId if he is the author or not
  const { userId: currentUser } = auth();
  const showActionButton = currentUser && currentUser === author.clerkId;

  return (
    <div className=" background-light900_dark200  rounded-[10px]  p-9 shadow-md sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${question._id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {question.title}
            </h3>
          </Link>
        </div>
        {/* If signed in add delete action */}
        <SignedIn>
          {showActionButton && (
            <EditDeleteAction type="answer" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <div>
          <Metric
            imgUrl={author.picture}
            alt="user"
            value={author.name}
            title={` `}
            href={`/profile/${author._id}`}
            isAuthor={true}
            textStyles="body-medium text-dark400_light700"
          />
        </div>

        <div className="flex-between flex-wrap gap-3 max-sm:gap-1.5">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={formatAndDivideNumber(upvotes.length)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default Answercard;
