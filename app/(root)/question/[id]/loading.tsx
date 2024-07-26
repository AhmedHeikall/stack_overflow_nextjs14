import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <section>
      <div className="mt-10 flex w-full flex-col gap-6">
        <Skeleton className="background-light800_dark300 h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="background-light800_dark300 h-4 w-[250px]" />
          <Skeleton className="background-light800_dark300 h-4 w-[200px]" />
        </div>
        <Skeleton className="background-light800_dark300 h-screen w-full rounded-2xl" />
      </div>
    </section>
  );
};

export default Loading;
