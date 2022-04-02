import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { connect, useDispatch } from "react-redux";
import { Avatar } from "antd";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";

function Mainheader({ auth }) {
  const router = useRouter();
  const menus = [
    {
      name: "Home",
      link: "/"
    },
    {
      name: "About",
      link: "/about"
    },
    {
      name: "Gallery",
      link: "/gallery"
    },
    {
      name: "Registration/Audition",
      link: "/register"
    },
    {
      name: "Be a Partner",
      parentSlug: "/partners",
      link: "/",
      hasSubMenu: true,
      subMenu: [
        {
          name: "Sponsorship",
          link: "/partners/sponsorship"
        },
        // {
        //   name: "Donations",
        //   link: "/partners/donations"
        // }
      ]
    },
    {
      name: "Contact",
      link: "/contact"
    },
    {
        name: 'Blog',
        link : '/blog'
    }
  ];

  const [search, setSearch] = useState(false);
  // console.log(router.pathname)
  return (
    <>
      <header className="hidden bg-black text-white lg:flex justify-between items-center w-full px-8 sticky top-0 z-[2]">
        <div className="inline-flex items-center">
          <Link href={"/"}>
            <a>
              <img
                src="/images/logo.png"
                alt="Bible Star TV Logo"
                style={{width:"67px", height:"62px"}}
                height={67}
                width={62}
              />
            </a>
          </Link>

          <ul className="inline-flex gap-6 ml-8">
            {menus.map((menu) => {
              if (menu.hasSubMenu) {
                return (
                  <li key={menu.name} className="has_submenu">
                    <a
                      className={` inline-flex items-center gap-2 py-3 text-lg hover:text-brand-yellow relative ${
                        router.pathname.includes(menu.parentSlug)
                          ? "text-brand-yellow"
                          : ""
                      }`}
                    >
                      <span>{menu.name}</span>
                      <span className="icon transition duration-300 ease-in-out">
                        <FaChevronDown />
                      </span>
                    </a>
                    <ul className="submenu absolute bg-white divide-y flex flex-col shadow-xl top-[3.9rem] w-[220px] transform translate-y-8 opacity-0 transition duration-300 ease-in-out">
                      {menu.subMenu.map((submenu) => (
                        <li key={submenu.name}>
                          <Link href={submenu.link}>
                            <a
                              className={`inline-block text-lg text-gray-700 pl-5 pr-8 py-3 hover:text-white hover:bg-brand-yellow w-full transition duration-200 ease-in-out`}
                            >
                              {submenu.name}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              } else if (menu.link === "/blog") {
                return (
                  <li key={menu.name}>
                    <Link href={menu.link}>
                      <a
                        className={`inline-block py-3 text-lg hover:text-brand-yellow ${
                          router.pathname.includes(menu.link)
                            ? "text-brand-yellow"
                            : ""
                        }`}
                      >
                        {menu.name}
                      </a>
                    </Link>
                  </li>
                );
              } else if (menu.link === "/register") {
                return (
                  <>
                    {!auth.isLoggedIn && (
                      <li key={menu.name}>
                        <Link href={menu.link}>
                          <a
                            className={`inline-block py-3 text-lg hover:text-brand-yellow ${
                              router.pathname.includes(menu.link)
                                ? "text-brand-yellow"
                                : ""
                            }`}
                          >
                            {menu.name}
                          </a>
                        </Link>
                      </li>
                    )}
                  </>
                );
              } else {
                return (
                  <li key={menu.name}>
                    <Link href={menu.link}>
                      <a
                        className={`inline-block py-3 text-lg hover:text-brand-yellow ${
                          router.pathname == menu.link
                            ? "text-brand-yellow"
                            : ""
                        }`}
                      >
                        {menu.name}
                      </a>
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>

        {auth.isLoggedIn && (
          <div>
            <Link href={"/dashboard"}>
              <a>
                <Avatar className="bg-gray-500" size={45}>
                  {auth.username[0].toUpperCase()}
                </Avatar>
              </a>
            </Link>
          </div>
        )}

        {!auth.isLoggedIn && (
          <div className="inline-flex gap-4">
            {/* {!search && (
              <button className="text-2xl" onClick={() => setSearch(true)}>
                <AiOutlineSearch />
              </button>
            )} */}
            <Link href="/login">
              <a className="block bg-gray-800 px-4 py-2 rounded hover:text-white hover:bg-gray-900 transition duration-300 ease-in-out">
                Login
              </a>
            </Link>

            <Link href="/watch">
              <a className="block bg-brand-red px-4 py-2 rounded hover:text-white hover:bg-red-700 transition duration-300 ease-in-out">
                Watch
              </a>
            </Link>
          </div>
        )}
      </header>
      {search && (
        <div className="fixed top-0 left-0 z-[3] bg-black opacity-90 flex items-center justify-center w-full h-full">
          <div className="w-1/2">
            <button
              className="text-lg text-white fixed z-10 right-3 top-5 bg-brand-red p-3 rounded-full opacity-100"
              onClick={() => setSearch(false)}
            >
              <AiOutlineClose />
            </button>
            <input
              className="py-4 px-3 w-full bg-black opacity-100 text-white text-lg border-b-2 border-white focus:outline-none"
              placeholder="What are you looking for?"
              autoFocus
            />
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Mainheader);
