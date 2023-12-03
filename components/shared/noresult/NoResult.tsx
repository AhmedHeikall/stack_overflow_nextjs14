import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Copyright from "../copyright/Copyright";

interface Props {
  title: string;
  descrption: string;
  link: string;
  linkTitle: string;
}

const NoResult = ({ title, descrption, link, linkTitle }: Props) => {
  return (
    <section className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        src="/assets/images/light-illustration.png"
        alt="no result"
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />
      <Image
        src="/assets/images/dark-illustration.png"
        alt="no result"
        width={270}
        height={200}
        className="hidden object-contain dark:flex"
      />

      <h2 className="text-dark200_light900 h2-bold mt-9">{title}</h2>
      <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center ">
        {descrption}
      </p>

      <Link href={link}>
        <Button className=" paragraph-medium mt-5 min-h-[46px] rounded-lg bg-primary-500 px-4 py-3 !text-light-900">
          {linkTitle}
        </Button>
      </Link>
      <Copyright />
    </section>
  );
};

export default NoResult;
