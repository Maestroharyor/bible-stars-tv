import { Image } from "antd";
import Link from "next/link";
import { Capitalize } from "../../functions/utilities";

function BlogCard({ blog }) {
  return (
    <Link href={`/blog/${blog.slug}`}>
      <a className="flex flex-col gap-3">
        <div>
          {blog.featured_image.thumbnail ? <Image
            alt=""
            src={blog.featured_image.thumbnail}
            preview={false}
            width={"100%"}
            height={200}
          /> : 
          <Image
            alt=""
            src={"/images/placeholder-image.png"}
            preview={false}
            width={"100%"}
            height={200}
          />
          }
          
          <p className="pt-1 text-gray-800 text-md">
            {blog.category.map((cat) => (
              <span key={cat}>{Capitalize(cat)}</span>
            ))}
          </p>
        </div>
        <h4 className="text-brand-yellow font-bold text-xl">{blog.title}</h4>
        {blog.excerpt ? (
          <p className="text-gray-700 text-lg">{`${blog.excerpt.substr(0, 100)}...`}</p>
        ) : (
          <p className="text-gray-700 text-lg">{`${blog.body
            .replace(/<[^>]+>/g, "")
            .substr(0, 100)}...`}</p>
        )}
      </a>
    </Link>
  );
}

export default BlogCard;
