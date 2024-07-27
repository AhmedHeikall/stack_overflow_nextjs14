import React from "react";
import NoResult from "@/components/shared/noresult/NoResult";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs | Dev Overflow",
  description: "Dev Overflow is a community of 1,000,000+ developers. join us.",
};

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
