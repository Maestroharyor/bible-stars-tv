import { useState, useEffect } from "react";
import { Image } from "antd";
import Link from "next/link";

import BlogCard from "../blog/BlogCard";

function HomeNewsList() {
  // blogs.query.map(blog => {
  //   console.log(blog.slug)
  // })
  // console.log({paths})
  // console.log(blogs);
  const blogStatic = [
    {
      src: "/images/blog/1.jpeg",
      desc: "The audience graced the impressive and breathtaking moment with clapping ovations."
    },
    {
      src: "/images/blog/2.jpeg",
      desc: "A daring moment where a contestant raises the bar."
    },
    {
      src: "/images/blog/3.jpeg",
      desc: "Contestants could not hold up  in the beautiful ambience of laughter."
    },
    {
      src: "/images/blog/4.jpeg",
      desc: "Silent but unceasing moment when the contestant awaits the unpredictable outcomes."
    },
    {
      src: "/images/blog/5.jpeg",
      desc: "The host graciously stepping out in a stunning and suspenseful moment."
    }
  ];

  return (
    <>
      <div className="grid grdi-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8 px-3 lg:max-w-[1300px] mx-auto">
        {/* {blogs.query.map((blog) => (
          // <Link key={news.title} href={news.link}>
          //     <a className='block rounded hover:text-brand-red' >
          //        <Image layout='responsive' width={500} height={500} src={news.image} className='w-full' alt='' />
          //         <p className='-mt-4 rounded-b bg-gray-100 font-bold pt-5 pb-2 px-2 hover:text-brand-red'>{news.title}</p>
          //     </a>

          // </Link>
          <BlogCard blog={blog} key={blog._id} />
        ))} */}

        {blogStatic.map((blog) => (
          <div key={blog.desc}
          >
            <Image src={blog.src} alt={"Contestant"} />
            <p className="font-medium text-lg">{blog.desc}</p>
          </div>
        ))}
      </div>
      {/* <div className="flex justify-center w-full">
        <Link href="/blog">
          <a className="bg-brand-red text-white px-5 py-2 rounded hover:bg-red-700 hover:text-white transition duration-300 ease-in-out inline-block mx-auto text-lg pt-3">
            See More Posts
          </a>
        </Link>
      </div> */}
    </>
  );
}

export default HomeNewsList;
