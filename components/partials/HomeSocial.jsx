import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
  FaFacebook
} from "react-icons/fa";

function HomeSocial() {
  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebook />,
      link: "https://www.facebook.com/biblestarstvshow"
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      link: "https://www.twitter.com/biblestarstv"
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      link: "https://www.instagram.com/biblestarstvshow"
    },
    {
      name: "Tiktok",
      icon: <FaTiktok />,
      link: "https://www.tiktok.com/@biblestarstvshow"
    },
    {
      name: "Youtube",
      icon: <FaYoutube />,
      link: "https://www.youtube.com/channel/UCl7BYp-kJKEPKfDdzjNflCg"
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      link: "https://api.whatsapp.com/send?phone=2347048811294&text=Hello"
    },
  ];

  return (
    <div className="grid grid-cols-6 lg:grid-cols-7">
      <div className="flex items-center justify-center lg:justify-start text-lg py-3 lg:pl-5 col-span-6 lg:col-span-1 text-center lg:text-left">
        <p>Join The Conversation</p>
      </div>
      {socialLinks.map((link) => (
        <a
          className="bg-brand-red flex justify-center gap-3 py-4 lg:py-2 text-white text-lg items-center hover:bg-black hover:text-white transition duration-300 ease-in-out"
          target={"_blank"}
          rel="noreferrer"
          href={link.link}
          key={link.name}
        >
          <p className="hidden lg:inline-block">{link.name}</p>
          {link.icon}
        </a>
      ))}
    </div>
  );
}

export default HomeSocial;
