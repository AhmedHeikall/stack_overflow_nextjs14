import React from "react";
import Image from "next/image";

import { Input } from "@/components/ui/input";

const GlopalSearch = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient flex  min-h-[56px] items-center gap-1 rounded-xl px-4 ">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search anything globally..."
          className="paragraph-regular no-focus placeholder text-dark400_light700 background-light800_darkgradient border-none  shadow-none outline-none dark:placeholder:text-slate-400"
        />
      </div>
    </div>
  );
};

export default GlopalSearch;
