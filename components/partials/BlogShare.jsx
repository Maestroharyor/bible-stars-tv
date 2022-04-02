import { useState, useEffect } from "react";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon
} from "react-share";

const BlogShare = () => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (window !== undefined) {
      setUrl(window.location.href);
    }
  }, []);
  return (
    <div className="flex flex-row justify-center lg:flex-col gap-5 lg:sticky top-[100px]">
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
    </div>
  );
};

export default BlogShare;
