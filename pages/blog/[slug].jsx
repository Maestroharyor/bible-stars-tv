import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import moment from "moment";
import axios from "axios";
import { Image, Avatar } from "antd";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import {
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaLinkedin
} from "react-icons/fa";
import { baseUrl } from "../../server/index";
import { Capitalize } from "../../functions/utilities";
import SkeletonSinglePost from "../../components/skeletons/SkeletonSinglePost";
const BlogShareComponent = dynamic(
  () => import("../../components/partials/BlogShare"),
  { ssr: false }
);

// import BlogCard from '../../components/blog/BlogCard'

function BlogPost() {
  const router = useRouter();
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPostDetail = async () => {
    setLoading(true);
    const blogDetail = await axios.get(`${baseUrl}/blogs/${router.query.slug}`);
    console.log(blogDetail);
    if (blogDetail.data[0]) {
      console.log(blogDetail.data[0]);
      setPostData(blogDetail.data[0]);
      setLoading(false);
    } else {
      // setLoading(false);
      router.push("/404");
    }
  };

  useEffect(() => {
    getPostDetail();
    // if(window !== undefined){
    //   setUrl(window.location.href)
    // }
  }, []);
  return (
    <DefaultLayout>
      {loading && <SkeletonSinglePost />}
      {!loading && postData && (
        <div className="max-w-[1000px] mx-auto text-lg leading-loose py-16">
          <div className="text-center px-4">
            <p className="mb-1">
              Published {moment(postData.createdAt).format("MMMM D, YYYY")}
            </p>
            <h1 className="text-5xl font-bold leading-[3.2rem]">
              {postData.title}
            </h1>
            {/* <p className="pt-3">
              Deserunt amet exercitation irure est in dolor reprehenderit ut
              ipsum laborum do anim.
            </p> */}

            <div className="inline-flex flex-col md:flex-row gap-7 justify-center mt-4 mb-5">
              {postData.category.map((cat) => (
                <p className="rounded bg-gray-100 px-8 py-1.5" key={cat}>
                  {Capitalize(cat)}
                </p>
              ))}
            </div>
          </div>

          <div className="py-10 mx-auto">
            {postData.featured_image.url ? (
              <Image
                alt=""
                src={postData.featured_image.url}
                width={"100%"}
                height={"auto"}
                //  preview={false}
                className="rounded-lg mx-auto"
              />
            ) : (
              <Image
                alt=""
                src={"/images/placeholder-image.png"}
                preview={false}
                width={"100%"}
                height={200}
              />
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div
              className="blog__body__content lg:col-span-11 px-5"
              dangerouslySetInnerHTML={{ __html: postData.body }}
            />
            <div>
              <BlogShareComponent />
              {/* <div className="flex flex-row justify-center lg:flex-col gap-5 lg:sticky top-[100px]">
                <FacebookShareButton url={url}>
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>

                <TwitterShareButton url={url}>
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>

                <TelegramShareButton url={url}>
                  <TelegramIcon size={32} round={true} />
                </TelegramShareButton>

                <WhatsappShareButton url={url}>
                  <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>

                <LinkedinShareButton url={url}>
                  <LinkedinIcon size={32} round={true} />
                </LinkedinShareButton>
              </div> */}
            </div>
          </div>

          <div className="my-16 grid grid-cols-1 lg:grid-cols-2 gap-7 justify-between text-lg px-5 lg:px-0">
            <div className="rounded border py-4 px-6 flex gap-5 items-center">
              {/* <Avatar size={40} className="me-2">USER</Avatar> */}
              Written by
              <p className="text-xl font-bold">{`${Capitalize(
                postData.created_by.firstname
              )} ${Capitalize(postData.created_by.lastname)}`}</p>
            </div>
            <div className="rounded border flex flex-col lg:flex-row gap-5 py-4 px-3">
              <Link href="/contact">
                <a className="text-white hover:text-white bg-gray-700 hover:bg-brand-red px-5 py-3 transition duration-300 ease-in-out transform hover:scale-110 text-center flex-1">
                  CONTACT
                </a>
              </Link>
              <Link href="/partners/sponsorship">
                <a className="text-white hover:text-white bg-gray-700 hover:bg-brand-red px-5 py-3 transition duration-300 ease-in-out transform hover:scale-110 text-center flex-1">
                  SPONSOR
                </a>
              </Link>
              {/* <Link href="/watch"><a className='text-white hover:text-white bg-brand-red hover:bg-red-700 px-5 py-3 transition duration-300 ease-in-out transform hover:scale-110 text-center flex-1'>WATCH</a></Link> */}
            </div>
          </div>
        </div>
      )}
      {!loading && postData === null && <>{router.push("/404")}</>}
      {/* <div className='w-full bg-gray-100 py-16 px-5'>
            <h3 className='text-3xl font-bold text-center mb-8'>This Might Also Interest You</h3>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto'>
                <BlogCard /> 
                <BlogCard /> 
                <BlogCard /> 
            </div>
        </div> */}

      <style jsx>
        {`
          .blog__body__content h2,
          .blog__body__content h3,
          .blog__body__content h4,
          .blog__body__content h5,
          .blog__body__content h6 {
            font-weight: bold;
            font-size: 2.5rem;
            margin-bottom: 30px;
          }
          .blog__body__content p {
            margin-bottom: 20px;
          }
        `}
      </style>
    </DefaultLayout>
  );
}

export default BlogPost;
