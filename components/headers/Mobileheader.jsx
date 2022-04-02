import {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {connect, useDispatch} from 'react-redux';
import {AiOutlineSearch, AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';

function Mobileheader({auth}) {
    const menus = [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "About",
        link: "/about",
      },
      {
        name: "Gallery",
        link: "/gallery",
      },
      {
        name: "Registration/Audition",
        link: "/register",
      },
      {
        name: "Sponsorship",
        link: "/partners/sponsorship",
      },
    //   {
    //     name: "Donations",
    //     link: "/partners/donations",
    //   },

      {
        name: "Contact",
        link: "/contact",
      },
      {
        name: "Blog",
        link: "/blog",
      },
    ];

    const [search, setSearch] = useState(false)
    const [mobileMenu, setMobileMenu] = useState(false)
    return (
        <>
        <header className="lg:hidden bg-black text-white flex justify-between items-center w-full px-2 sticky top-0 z-[2]">
            <Link href={"/"}>
            <a>
              <img
                src="/images/logo.png"
                alt="Bible Star TV Logo"
                style={{width:"67px", height:"62px"}}
                height={47}
                width={42}
              />
            </a>
          </Link>
           
            
            <div className='inline-flex'>
                {/* {!search && <button className="text-2xl mr-3" onClick={()=> setSearch(true)}>
                    <AiOutlineSearch />
                </button>} */}
                {!mobileMenu && <button className="text-2xl mr-3" onClick={()=> setMobileMenu(true)}>
                    <AiOutlineMenu />
                </button>}
            </div>
        </header>

        {
            mobileMenu &&
            <div className='fixed top-0 left-0 z-[3] bg-slate-900 flex items-center justify-center w-full h-full'>
                <div className='w-full px-3'>
                    <button className='text-lg text-white fixed z-10 right-3 top-5 bg-brand-red p-3 rounded-full opacity-100' onClick={()=> setMobileMenu(false)}><AiOutlineClose /></button>
                    <ul className="flex flex-col justify-center items-center ml-4">
                    {
                        menus.map(menu => (
                            <li key={menu.name}>
                                <Link href={menu.link}>
                                    <a className="text-white inline-block mx-2 my-2 text-lg hover:text-brand-yellow text-center">{menu.name}</a>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <div className='flex flex-col sm:flex-row justify-center items-center gap-4 mt-4'>
                    {!auth.isLoggedIn && <>
                    <Link href="/login">
                        <a className='block bg-gray-300 px-4 py-2 rounded w-full text-center font-bold text-lg text-black'>
                            Login
                        </a>
                    </Link>

                    <Link href="/watch">
                        <a className='block bg-brand-red px-4 py-2 rounded w-full text-center font-bold text-lg'>
                            Watch
                        </a>
                    </Link>
                    </>}

                    {auth.isLoggedIn && <Link href="/login">
                        <a className='block bg-gray-300 px-4 py-2 rounded w-full text-center font-bold text-lg text-black'>
                            Login
                        </a>
                    </Link>}

                </div>
 
                </div>

            </div>
        }

        {
            search &&
            <div className='fixed top-0 left-0 z-[3] bg-black opacity-90 flex items-center justify-center w-full h-full'>
                <div className='w-full px-3'>
                    <button className='text-lg text-white fixed z-10 right-3 top-5 bg-brand-red p-3 rounded-full opacity-100' onClick={()=> setSearch(false)}><AiOutlineClose /></button>
                    <input className="py-4 px-3 w-full bg-black opacity-100 text-white text-lg border-b-2 border-white focus:outline-none" placeholder="What are you looking for?" autoFocus />
                </div>

            </div>
        }
        </>
    )
}

const mapStateToProps = (state) => {
    return state;
  };
  
  export default connect(mapStateToProps)(Mobileheader);