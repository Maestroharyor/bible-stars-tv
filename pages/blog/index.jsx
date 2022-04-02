import { useState, useEffect } from "react";
import { Image } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Input } from "antd";
import { FaSearch, FaCircleNotch } from "react-icons/fa";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import PageBanner from "../../components/partials/PageBanner";
import BlogCard from "../../components/blog/BlogCard";
import { baseUrl } from "../../server/index";
import BlogPageSkeleton from "../../components/skeletons/BlogPageSkeleton";
import BlogSkeletonLoading from "../../components/skeletons/BlogSkeletonLoading";

const Blog = () => {
  const [blogsData, setBlogsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(2);

  const getPosts = async () => {
    setLoading(true);
    const blogs = await axios.get(`${baseUrl}/blogs`);
    console.log(blogs);
    setBlogsData(blogs.data.query);
    setLoading(false);
  };

  const searchPost = async (term) => {
    setLoading(true);
    const blogSearch = await axios.get(`${baseUrl}/blogs/search?term=${term}`);
    if(blogSearch.data.query){
      setBlogsData(blogSearch.data.query);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const getMorePost = async () => {
    const newPosts = await axios.get(`${baseUrl}/blogs?page=${currentPage}`);

    console.log(newPosts);
    console.log(blogsData);

    setBlogsData((blogsData) => [...blogsData, ...newPosts.data.query]);
    setCurrentPage(currentPage + 1);
    if (newPosts.data.has_next_page === false) {
      setHasMore(false);
    }
    // setLoading(false);
  };
  return (
    <DefaultLayout>
      <PageBanner name={"Blog"} description={"Our Blog"} />
      <div className="my-14 max-w-[700px] mx-auto text-2xl px-5">
        {/* <p className="mb-5 text-xl text-center text-gray-600">
          Reprehenderit duis exercitation pariatur nulla consectetur consectetur
          eiusmod pariatur id.
        </p> */}
        <Input
          placeholder="Search..."
          size="large"
          className="text-lg rounded-lg"
          prefix={<FaSearch className="pr-1" />}
          onChange={(e) => {
            if(e.target.value){
              searchPost(e.target.value)
            } else{
              getPosts()
            }
            
          }}
        />
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-[1200px] mx-auto pt-2 pb-20 px-5 lg:px-2"> */}
      {loading && <div className="max-w-[1200px] mx-auto pt-2 pb-20 px-5 lg:px-2">
        <BlogSkeletonLoading />
        </div>}
      <InfiniteScroll
        dataLength={blogsData.length}
        next={getMorePost}
        hasMore={hasMore}
        scrollThreshold={"50%"}
        loader={<div className="col-span-3"><BlogSkeletonLoading />
          </div>}
        endMessage={<h4 className="col-span-3 text-2xl">No more posts to show...</h4>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-[1200px] mx-auto pt-2 pb-20 px-5 lg:px-2">
        {blogsData.map((blog) => (
          <BlogCard blog={blog} key={blog._id} />
        ))}
        </div>

      </InfiniteScroll>
      {/* </div> */}
    </DefaultLayout>
  );
};

export default Blog;
