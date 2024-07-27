import React from "react";
import NoResult from "@/components/shared/noresult/NoResult";

const Jobs = () => {
  return (
    <div>
      <NoResult
        title="There’s no Jobs to show"
        descrption=" cooming soon!"
        link="/ask-question"
        linkTitle="Ask a Question"
      />
    </div>
  );
};

export default Jobs;
