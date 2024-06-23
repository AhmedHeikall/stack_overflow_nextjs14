"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

interface Props {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses: string;
}

const LocalSearchbar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keys: ["q"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [route, router, pathname, searchParams, search, query]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-xl px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder={placeholder}
        className="paragraph-regular no-focus placeholder text-dark400_light700 background-light800_darkgradient border-none  shadow-none outline-none dark:placeholder:text-slate-400"
      />
      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchbar;
