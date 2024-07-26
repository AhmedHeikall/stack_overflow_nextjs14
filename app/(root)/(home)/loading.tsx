import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Skeleton className="background-light800_dark300 h-14 w-40" />
      </div>

      <div className="mb-12 mt-11 flex flex-wrap gap-5">
        <Skeleton className="background-light800_dark300 h-14 flex-1" />
        <Skeleton className="background-light800_dark300 h-14 w-28" />
      </div>

      <div className="mt-10 hidden flex-wrap gap-3 md:flex">
        <Skeleton className="background-light800_dark300 h-14 w-28" />
        <Skeleton className="background-light800_dark300 h-14 w-28" />
        <Skeleton className="background-light800_dark300 h-14 w-28" />
        <Skeleton className="background-light800_dark300 h-14 w-28" />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {[1, 2, 3, 4, 5].map((item) => (
          <Skeleton
            key={item}
            className="background-light800_dark300 h-60 w-full rounded-2xl "
          />
        ))}
      </div>
    </section>
  );
};

export default Loading;
