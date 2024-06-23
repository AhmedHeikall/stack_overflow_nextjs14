import React from "react";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Filter from "@/components/shared/filter/Filter";
import NoResult from "@/components/shared/noresult/NoResult";
import UserCard from "@/components/cards/UserCard";
import { getAllUsers } from "@/lib/actions/user.action";
import { UserFilters } from "@/constants/filters";
import { SearchParamsProps } from "@/types";

const Community = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllUsers({
    searchQuery: searchParams.q,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Developers</h1>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for best minds here..."
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-12 flex flex-wrap  gap-4">
        {/* Looping throw devs cards */}
        {result.users.length > 0 ? (
          result.users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <NoResult
            title="There’s no Developers to show"
            descrption=" Be the first to break the silence! 🚀 SignUp and kickstart the
          discussion. our query could be the next big thing others learn from. Get
          involved! 💡"
            link="/"
            linkTitle="Home"
          />
        )}
      </div>
    </>
  );
};

export default Community;
