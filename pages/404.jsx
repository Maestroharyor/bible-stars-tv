import React from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaHome, FaArrowLeft } from "react-icons/fa";

function PageNotFound() {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="This page does not exist" />
        <meta name="theme-color" content="#fff" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maxiumum-scale=1"
        />
        {/* <link rel="icon" href="/images/logo/fav.png" /> */}
        <title>Page Not Found</title>
      </Head>
      <div className="bg-white flex flex-col items-center justify-center w-full h-full py-40">
        <div>
          <Link href={"/"}>
            <a>
              <Image
                className="cursor-pointer"
                src={"/images/logo.png"}
                alt="Logo Loader"
                height={137}
                width={132}
              />
            </a>
          </Link>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Page Not Found</h1>
        <div className="flex flex-col md:flex-row gap-5">
          <button
            className="inline-flex gap-2 items-center justify-center hover:text-gray-500 transition duration-300 ease-in-out text-center"
            onClick={() => {
              router.back();
            }}
          >
            <FaArrowLeft />
            <span>Go Back</span>
          </button>

          <Link href="/">
            <a className="inline-flex gap-2 items-center bg-brand-red text-white  hover:text-white hover:bg-red-700 px-5 py-3 rounded transition duration-300 ease-in-out">
              <FaHome />
              <span>Go Home</span>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
