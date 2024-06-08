import { Typography } from "@/components/base/Typography/Typography";
import { ProjectUrls } from "@/const";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import Illustration from "./illustration.svg";

export const ErrorTemplate = () => {
  return (
    <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-center space-y-16 lg:space-y-0 space-x-8 2xl:space-x-0">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center">
        <Typography
          level="p"
          styling="h1"
          className="tracking-wider text-gray-300"
        >
          404
        </Typography>
        <Typography
          level="h1"
          styling="h2"
          className="tracking-wider text-gray-300"
        >
          Page Not Found
        </Typography>
        <Typography className="text-gray-500 my-6">
          Sorry, the page you are looking for could not be found.
        </Typography>
        <Button as={Link} color="primary" href={ProjectUrls.home}>
          <Typography>Return Home</Typography>
        </Button>
      </div>
      <div className="w-1/2 lg:h-full flex lg:items-end justify-center p-4">
        <Illustration />
      </div>
    </div>
  );
};
