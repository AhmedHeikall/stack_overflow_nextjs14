import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <section>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      <div className="mt-10 flex w-full flex-col gap-6">
        {[1, 2, 3, 4, 5].map((item) => (
          <Skeleton
            key={item}
            className="background-light800_dark300 h-32 w-full rounded-2xl "
          />
        ))}
      </div>
    </section>
  );
};

export default Loading;
