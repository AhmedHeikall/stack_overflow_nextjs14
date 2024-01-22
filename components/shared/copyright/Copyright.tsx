import React from "react";

import Link from "next/link";

const Copyright = () => {
  return (
    <p className="body-regular text-dark500_light700 my-3.5 mt-9 max-w-md text-center">
      Copyright © 2024 DevFlow -
      <Link
        href={`https://www.linkedin.com/in/ahmed-heikal-875175236/`}
        replace={true}
        target="_blank"
      >
        Ahmed Heikal
      </Link>
    </p>
  );
};

export default Copyright;
