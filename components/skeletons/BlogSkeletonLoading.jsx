import BlogPageSkeleton from "./BlogPageSkeleton";

function BlogSkeletonLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <BlogPageSkeleton />
      <BlogPageSkeleton />
      <BlogPageSkeleton />
      <BlogPageSkeleton />
      <BlogPageSkeleton />
      <BlogPageSkeleton />
    </div>
  );
}

export default BlogSkeletonLoading;
