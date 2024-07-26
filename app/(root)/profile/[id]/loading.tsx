import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <section>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <Skeleton className="background-light800_dark300 h-36 w-36 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="background-light800_dark300 h-14 w-28" />
        </div>
      </div>

      <div className="mt-10 hidden flex-wrap gap-3 md:flex">
        <Skeleton className="background-light800_dark300 h-24 w-28" />
        <Skeleton className="background-light800_dark300 h-24 w-28" />
        <Skeleton className="background-light800_dark300 h-24 w-28" />
        <Skeleton className="background-light800_dark300 h-24 w-28" />
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
